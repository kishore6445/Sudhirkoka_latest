/**
 * Persistence utility for form submissions (server-side only).
 *
 * Uses the SERVICE ROLE key, so this module must only ever be imported by
 * serverless functions under `/api`. The `public.form_submissions` table has
 * RLS enabled with NO anon/authenticated policies, so only the service-role
 * client (used here) can read or write it.
 */

import { createClient } from "@supabase/supabase-js";
import { getSupabaseConfig } from "./env.js";

const TABLE = "form_submissions";

let cachedClient = null;

/** Lazily create a singleton service-role client. Throws if misconfigured. */
function getClient() {
  const { url, serviceRoleKey } = getSupabaseConfig();
  if (!url || !serviceRoleKey) {
    throw new Error("Supabase is not configured");
  }
  if (!cachedClient) {
    cachedClient = createClient(url, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return cachedClient;
}

/**
 * Insert a submission row with status "received" and email_status "pending".
 * Returns the new row id.
 */
export async function insertSubmission({ formKey, fields, replyTo, filePath }) {
  const { data, error } = await getClient()
    .from(TABLE)
    .insert({
      form_key: formKey,
      fields,
      reply_to: replyTo ?? null,
      file_path: filePath ?? null,
    })
    .select("id")
    .single();

  if (error) throw error;
  return data.id;
}

/**
 * Record the outcome of the notification email on an existing row. Never
 * throws — a persistence failure here must not fail the request, since the
 * submission itself is already safely stored.
 */
export async function markEmailResult(id, { sent, errorMessage } = {}) {
  try {
    await getClient()
      .from(TABLE)
      .update({
        email_status: sent ? "sent" : "failed",
        email_error: sent ? null : (errorMessage ?? "unknown error"),
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);
  } catch {
    // Swallow: the submission is already persisted; email status is advisory.
  }
}
