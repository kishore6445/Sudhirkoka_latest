/**
 * Supabase Storage utility (server-side only).
 *
 * Uses the SERVICE ROLE key, so this module must only ever be imported by
 * serverless functions under `/api`. It never streams file bytes through the
 * function: instead it hands the browser a short-lived *signed upload URL* so
 * large videos go directly to Supabase Storage (see BACKEND_SETUP.md).
 */

import { createClient } from "@supabase/supabase-js";
import { getSupabaseConfig } from "./env.js";
import { extensionForMime, safeSlug } from "./validation.js";

let cachedClient = null;

/** Lazily create a singleton service-role client. Throws if misconfigured. */
function getClient() {
  const { url, serviceRoleKey } = getSupabaseConfig();
  if (!url || !serviceRoleKey) {
    throw new Error("Supabase storage is not configured");
  }
  if (!cachedClient) {
    cachedClient = createClient(url, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return cachedClient;
}

/**
 * Build a collision-proof storage path. The filename is generated entirely
 * server-side from the validated MIME type — the client-provided filename is
 * never used, so one user cannot overwrite another user's upload.
 *
 * Shape: form-submissions/<form>/<YYYY>/<MM>/<uuid>.<ext>
 */
export function buildStoragePath({ formKey, contentType }) {
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, "0");
  const ext = extensionForMime(contentType);
  const unique = (globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`);
  return `form-submissions/${safeSlug(formKey)}/${year}/${month}/${unique}.${ext}`;
}

/**
 * Create a signed upload URL so the browser can PUT the file straight to
 * Supabase Storage without the bytes passing through this function.
 * Returns { path, token, signedUrl }.
 */
export async function createSignedUpload({ formKey, contentType }) {
  const { bucket } = getSupabaseConfig();
  const path = buildStoragePath({ formKey, contentType });
  const { data, error } = await getClient()
    .storage.from(bucket)
    .createSignedUploadUrl(path);

  if (error) throw error;
  return { path, token: data.token, signedUrl: data.signedUrl };
}

/**
 * Create a short-lived signed URL for reading a stored object. Used later to
 * embed a secure, expiring link to the uploaded file in notification emails.
 */
export async function createSignedDownloadUrl(path, { expiresInSeconds = 60 * 60 * 24 * 7 } = {}) {
  const { bucket } = getSupabaseConfig();
  const { data, error } = await getClient()
    .storage.from(bucket)
    .createSignedUrl(path, expiresInSeconds);

  if (error) throw error;
  return data.signedUrl;
}
