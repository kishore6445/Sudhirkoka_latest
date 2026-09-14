/**
 * HTTP helpers for Vercel serverless functions (Node runtime).
 *
 * These keep every endpoint's responses consistent and make sure internal
 * details (stack traces, secrets, env values) are never leaked to clients.
 */

/** Send a JSON response with an explicit status code. */
export function sendJson(res, status, payload) {
  res.status(status);
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  // Never allow API JSON responses to be cached.
  res.setHeader("Cache-Control", "no-store");
  res.send(JSON.stringify(payload));
}

/** Standard success envelope. */
export function ok(res, data = {}) {
  sendJson(res, 200, { success: true, ...data });
}

/** Standard client-error envelope (validation / bad request). */
export function badRequest(res, error = "Invalid request") {
  sendJson(res, 400, { success: false, error });
}

/** Standard 405 for unsupported methods. */
export function methodNotAllowed(res, allow = []) {
  if (allow.length) res.setHeader("Allow", allow.join(", "));
  sendJson(res, 405, { success: false, error: "Method not allowed" });
}

/**
 * Standard server-error envelope. Logs the real cause server-side but returns
 * a generic message so internals are never exposed.
 */
export function serverError(res, cause, context = "request") {
  // Server-side diagnostics only. Never include secrets here.
  console.error(`[v0][api] Failed to process ${context}:`, cause?.message || cause);
  sendJson(res, 500, { success: false, error: "Unable to process request" });
}

/** Guard that a request uses one of the allowed methods. Returns false if handled. */
export function requireMethod(req, res, methods) {
  if (!methods.includes(req.method)) {
    methodNotAllowed(res, methods);
    return false;
  }
  return true;
}

/**
 * Safely parse a JSON request body with a hard size cap.
 *
 * Endpoints in this infrastructure only ever accept small JSON payloads
 * (form fields and file *metadata*) — never raw file bytes — so a tight limit
 * protects the function from oversized/malformed requests.
 */
export async function readJsonBody(req, { maxBytes = 100 * 1024 } = {}) {
  // Vercel may have already parsed a JSON body.
  if (req.body && typeof req.body === "object") return req.body;

  const raw = await new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > maxBytes) {
        reject(new Error("Payload too large"));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });

  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    throw new Error("Malformed JSON body");
  }
}
