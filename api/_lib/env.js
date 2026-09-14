/**
 * Server-only environment access.
 *
 * This module is imported exclusively by serverless functions under `/api`.
 * None of these values are ever sent to the browser. Do NOT import this file
 * from anything inside `src/` (the Vite client bundle).
 *
 * Secrets are read lazily so that a single missing variable does not crash
 * unrelated endpoints at import time.
 */

/** Storage bucket used for form-submission uploads. */
export const STORAGE_BUCKET = process.env.SUPABASE_STORAGE_BUCKET || "form-uploads";

/**
 * Returns the Supabase server configuration.
 * Uses the service-role key, which must remain server-side only.
 */
export function getSupabaseConfig() {
  return {
    url: process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || "",
    bucket: STORAGE_BUCKET,
  };
}

/** Returns the Resend/email configuration. */
export function getEmailConfig() {
  return {
    apiKey: process.env.RESEND_API_KEY || "",
    fromEmail: process.env.FORM_FROM_EMAIL || "",
    notificationEmail: process.env.FORM_NOTIFICATION_EMAIL || "",
  };
}

/**
 * Reports which required variables are configured, WITHOUT exposing any value.
 * Safe to surface in a health check.
 */
export function getConfigStatus() {
  const supabase = getSupabaseConfig();
  const email = getEmailConfig();

  return {
    supabase: {
      url: Boolean(supabase.url),
      serviceRoleKey: Boolean(supabase.serviceRoleKey),
      bucket: Boolean(process.env.SUPABASE_STORAGE_BUCKET),
    },
    email: {
      apiKey: Boolean(email.apiKey),
      fromEmail: Boolean(email.fromEmail),
      notificationEmail: Boolean(email.notificationEmail),
    },
  };
}
