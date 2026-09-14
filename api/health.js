/**
 * GET /api/health
 *
 * Confirms the serverless backend is deployed and responding, and reports
 * which integrations are *configured* as booleans only. It never returns any
 * secret, credential, or environment-variable value.
 */

import { ok, requireMethod } from "./_lib/http.js";
import { getConfigStatus } from "./_lib/env.js";

export default function handler(req, res) {
  if (!requireMethod(req, res, ["GET"])) return;

  ok(res, {
    status: "operational",
    timestamp: new Date().toISOString(),
    configured: getConfigStatus(),
  });
}
