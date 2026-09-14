/**
 * POST /api/forms/submit
 *
 * Step 2 of the flow. After any (optional) file has already been uploaded
 * directly to Supabase Storage, the browser posts the form fields plus the
 * returned storage path. The server validates everything, turns the storage
 * path into a short-lived secure link, and emails a notification via Resend.
 *
 * This is reusable, form-agnostic infrastructure. It is intentionally NOT
 * wired to any existing form yet — no existing form posts here.
 *
 * Request:  { formKey, fields: { [label]: value }, replyTo?, filePath? }
 * Response: { success: true }
 */

import { ok, badRequest, serverError, requireMethod, readJsonBody } from "../_lib/http.js";
import { isNonEmptyString, isValidEmail, cleanString, safeSlug } from "../_lib/validation.js";
import { createSignedDownloadUrl } from "../_lib/storage.js";
import { sendFormNotification } from "../_lib/email.js";

const MAX_FIELDS = 40;

export default async function handler(req, res) {
  if (!requireMethod(req, res, ["POST"])) return;

  let body;
  try {
    body = await readJsonBody(req);
  } catch {
    return badRequest(res, "Invalid request");
  }

  const { formKey, fields, replyTo, filePath } = body || {};

  if (!isNonEmptyString(formKey, { max: 64 })) {
    return badRequest(res, "Missing form identifier");
  }
  if (fields === null || typeof fields !== "object" || Array.isArray(fields)) {
    return badRequest(res, "Missing form data");
  }

  const entries = Object.entries(fields);
  if (entries.length === 0 || entries.length > MAX_FIELDS) {
    return badRequest(res, "Invalid form data");
  }
  if (replyTo !== undefined && !isValidEmail(replyTo)) {
    return badRequest(res, "Invalid email address");
  }
  if (filePath !== undefined && !isNonEmptyString(filePath, { max: 512 })) {
    return badRequest(res, "Invalid file reference");
  }

  // Sanitize every field label + value before it reaches the email template.
  const safeFields = {};
  for (const [label, value] of entries) {
    safeFields[cleanString(label, { max: 128 })] = cleanString(String(value ?? ""), { max: 5000 });
  }

  try {
    let fileUrl;
    if (filePath) {
      fileUrl = await createSignedDownloadUrl(filePath);
    }

    await sendFormNotification({
      subject: `New submission: ${safeSlug(formKey)}`,
      fields: safeFields,
      fileUrl,
      ...(replyTo ? { replyTo } : {}),
    });

    return ok(res);
  } catch (cause) {
    return serverError(res, cause, "form-submit");
  }
}
