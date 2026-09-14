/**
 * Resend email utility (server-side only).
 *
 * The RESEND_API_KEY is read from the environment and never leaves the server.
 * `sendFormNotification` is form-agnostic so every future form (Share Your
 * Story, Let's Talk, Enquiry, ...) can reuse it.
 */

import { Resend } from "resend";
import { getEmailConfig } from "./env.js";
import { escapeHtml } from "./validation.js";

let cachedClient = null;

function getClient() {
  const { apiKey } = getEmailConfig();
  if (!apiKey) throw new Error("Resend is not configured");
  if (!cachedClient) cachedClient = new Resend(apiKey);
  return cachedClient;
}

/**
 * Render a simple, safe HTML table from a set of labelled fields.
 * All keys and values are HTML-escaped to prevent injection.
 */
function renderFieldsHtml(fields = {}) {
  const rows = Object.entries(fields)
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 12px;font-weight:600;vertical-align:top">${escapeHtml(
          label
        )}</td><td style="padding:6px 12px">${escapeHtml(value)}</td></tr>`
    )
    .join("");
  return `<table style="border-collapse:collapse;font-family:system-ui,sans-serif;font-size:14px">${rows}</table>`;
}

function renderFieldsText(fields = {}) {
  return Object.entries(fields)
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n");
}

/**
 * Send a form-submission notification email.
 *
 * @param {object} params
 * @param {string} [params.to]        Recipient. Defaults to FORM_NOTIFICATION_EMAIL.
 * @param {string} [params.from]      Sender. Defaults to FORM_FROM_EMAIL.
 * @param {string} params.subject     Email subject line.
 * @param {object} [params.fields]    Label -> value map of submitted data.
 * @param {string} [params.fileUrl]   Optional secure link to an uploaded file.
 * @param {string} [params.fileLabel] Link text for the file URL.
 */
export async function sendFormNotification({
  to,
  from,
  replyTo,
  subject,
  fields = {},
  fileUrl,
  fileLabel = "View uploaded file",
}) {
  const { fromEmail, notificationEmail } = getEmailConfig();
  const recipient = to || notificationEmail;
  // Fall back to Resend's shared sending domain so notifications work without
  // a verified custom domain. Set FORM_FROM_EMAIL to send from your own domain.
  const sender = from || fromEmail || "onboarding@resend.dev";

  if (!recipient || !sender) {
    throw new Error("Email sender/recipient is not configured");
  }
  if (!subject) throw new Error("Email subject is required");

  const safeFileUrl = typeof fileUrl === "string" && /^https:\/\//.test(fileUrl) ? fileUrl : null;

  const fileHtml = safeFileUrl
    ? `<p style="margin:16px 0"><a href="${escapeHtml(safeFileUrl)}" style="color:#1a73e8">${escapeHtml(
        fileLabel
      )}</a></p>`
    : "";
  const fileText = safeFileUrl ? `\n\n${fileLabel}: ${safeFileUrl}` : "";

  const html = `<div style="font-family:system-ui,sans-serif;color:#111">
    <h2 style="font-size:18px;margin:0 0 12px">${escapeHtml(subject)}</h2>
    ${renderFieldsHtml(fields)}
    ${fileHtml}
  </div>`;

  const text = `${subject}\n\n${renderFieldsText(fields)}${fileText}`;

  const { data, error } = await getClient().emails.send({
    from: sender,
    to: recipient,
    subject,
    html,
    text,
    ...(replyTo ? { replyTo } : {}),
  });

  if (error) throw error;
  return data;
}
