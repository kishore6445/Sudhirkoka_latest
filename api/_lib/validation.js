/**
 * Reusable, framework-agnostic validation + sanitization helpers.
 *
 * Every serverless endpoint should validate untrusted input through these
 * helpers before touching storage or email. Client-provided values (filenames,
 * extensions, sizes) are treated as hints only, never as trusted facts.
 */

/** Allowed upload categories mapped to their permitted MIME types + limits. */
export const UPLOAD_POLICIES = {
  video: {
    mimeTypes: ["video/mp4", "video/quicktime", "video/webm", "video/x-m4v"],
    maxBytes: 500 * 1024 * 1024, // 500 MB
  },
  image: {
    mimeTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
    maxBytes: 10 * 1024 * 1024, // 10 MB
  },
  document: {
    mimeTypes: ["application/pdf"],
    maxBytes: 25 * 1024 * 1024, // 25 MB
  },
};

/** Canonical extension derived from the (trusted) MIME type, not the filename. */
const MIME_EXTENSION = {
  "video/mp4": "mp4",
  "video/quicktime": "mov",
  "video/webm": "webm",
  "video/x-m4v": "m4v",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "application/pdf": "pdf",
};

export function isNonEmptyString(value, { max = 5000 } = {}) {
  return typeof value === "string" && value.trim().length > 0 && value.length <= max;
}

/** Conservative email format check. */
export function isValidEmail(value) {
  if (typeof value !== "string" || value.length > 320) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

/** Collapse whitespace and clamp length. Does not attempt to allow HTML. */
export function cleanString(value, { max = 5000 } = {}) {
  if (typeof value !== "string") return "";
  return value.replace(/\s+/g, " ").trim().slice(0, max);
}

/**
 * Escape a value for safe interpolation into an HTML email template.
 * Prevents HTML/script injection from user-submitted content.
 */
export function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Extension the server will actually use, based on the validated MIME type. */
export function extensionForMime(mimeType) {
  return MIME_EXTENSION[mimeType] || "bin";
}

/**
 * Validate file metadata (never the bytes) against an upload policy.
 * Returns { valid, error?, policy? }.
 */
export function validateFileMetadata({ category, contentType, sizeBytes }) {
  const policy = UPLOAD_POLICIES[category];
  if (!policy) {
    return { valid: false, error: "Unsupported upload category" };
  }
  if (!policy.mimeTypes.includes(contentType)) {
    return { valid: false, error: "Unsupported file type" };
  }
  if (!Number.isInteger(sizeBytes) || sizeBytes <= 0) {
    return { valid: false, error: "Invalid file size" };
  }
  if (sizeBytes > policy.maxBytes) {
    return { valid: false, error: "File exceeds the maximum allowed size" };
  }
  return { valid: true, policy };
}

/** Restrict a caller-supplied form key to a safe slug used in storage paths. */
export function safeSlug(value, fallback = "general") {
  const slug = String(value ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);
  return slug || fallback;
}
