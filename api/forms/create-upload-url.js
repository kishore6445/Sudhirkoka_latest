/**
 * POST /api/forms/create-upload-url
 *
 * Step 1 of the direct-to-storage upload flow. The browser sends only file
 * *metadata* (form key, content type, size). The server validates it and
 * returns a short-lived signed upload URL that the browser uses to send the
 * file straight to Supabase Storage — the bytes never pass through this
 * function, so large videos are not limited by serverless payload caps.
 *
 * This endpoint is reusable infrastructure. It is intentionally NOT wired to
 * any existing form yet.
 *
 * Request:  { formKey: string, contentType: string, sizeBytes: number, category: "video"|"image"|"document" }
 * Response: { success: true, path, token, signedUrl }
 */

import { ok, badRequest, serverError, requireMethod, readJsonBody } from "../_lib/http.js";
import { validateFileMetadata, isNonEmptyString } from "../_lib/validation.js";
import { createSignedUpload } from "../_lib/storage.js";

export default async function handler(req, res) {
  if (!requireMethod(req, res, ["POST"])) return;

  let body;
  try {
    body = await readJsonBody(req);
  } catch {
    return badRequest(res, "Invalid request");
  }

  const { formKey, contentType, sizeBytes, category } = body || {};

  if (!isNonEmptyString(formKey, { max: 64 })) {
    return badRequest(res, "Missing form identifier");
  }
  if (!isNonEmptyString(contentType, { max: 128 })) {
    return badRequest(res, "Missing file type");
  }

  const check = validateFileMetadata({ category, contentType, sizeBytes });
  if (!check.valid) {
    return badRequest(res, check.error);
  }

  try {
    const upload = await createSignedUpload({ formKey, contentType });
    return ok(res, upload);
  } catch (cause) {
    return serverError(res, cause, "create-upload-url");
  }
}
