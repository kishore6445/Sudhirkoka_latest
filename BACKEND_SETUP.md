# Form Submission Backend Infrastructure

This document describes the **server-side backend infrastructure** added for form
submissions. It is intentionally **not connected to any existing form yet** — the
frontend forms (Share Your Story, Let's Talk, Enquiry, Contact) are unchanged and
will be wired up in a later step.

The project remains a **React + Vite** app deployed on **Vercel**. No framework
migration was performed. The backend runs as **Vercel serverless functions** in
the `/api` directory, which Vercel builds automatically alongside the Vite site.

---

## 1. What was added

```
api/
  _lib/                     shared, reusable server-only utilities
    env.js                  reads/validates server env vars (never exposed)
    http.js                 JSON responses, method guards, safe body parsing
    validation.js           input validation, sanitization, HTML escaping, file-metadata rules
    storage.js              Supabase Storage: signed upload URLs + signed download URLs
    email.js                Resend wrapper: sendFormNotification()
  health.js                 GET /api/health — health check
  forms/
    create-upload-url.js    POST — step 1: validate metadata, return signed upload URL
    submit.js               POST — step 2: validate fields, sign file URL, send email
.env.example                documented placeholders for required variables
BACKEND_SETUP.md            this document
```

Files/folders under `api/_lib` are prefixed conceptually as internal; the `_lib`
name is not routed as an endpoint by Vercel.

## 2. Required environment variables

| Variable | Purpose | Notes |
| --- | --- | --- |
| `SUPABASE_URL` | Supabase project URL | Already provided by the Supabase integration |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-side storage access | **Server-only. Never expose.** Already provided |
| `SUPABASE_STORAGE_BUCKET` | Upload bucket name | Optional; defaults to `form-uploads` |
| `RESEND_API_KEY` | Resend API key | **Server-only.** Needs manual configuration |
| `FORM_NOTIFICATION_EMAIL` | Where notifications are sent | Needs manual configuration |
| `FORM_FROM_EMAIL` | Verified Resend sender address | Needs manual configuration |

**None** of these may be prefixed with `VITE_`, because `VITE_` variables are
bundled into the browser. All secrets stay server-side.

## 3. Where to configure them in Vercel

Vercel Dashboard → your project → **Settings → Environment Variables**. Add each
variable for the appropriate environments (Production / Preview / Development).
`SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are already present via the
Supabase integration. Add `RESEND_API_KEY`, `FORM_NOTIFICATION_EMAIL`,
`FORM_FROM_EMAIL`, and (optionally) `SUPABASE_STORAGE_BUCKET`.

## 4. Supabase Storage configuration

- A **private** Storage bucket is expected (default name `form-uploads`).
- Uploads are stored under a collision-proof path:
  `form-submissions/<form>/<YYYY>/<MM>/<uuid>.<ext>`.
- The filename is generated **server-side** from the validated MIME type. The
  client-provided filename is never trusted or used, so uploads cannot collide
  or overwrite each other.
- Because the bucket is private, files are shared only through **short-lived
  signed URLs** created server-side (default 7-day expiry for email links).
- If you change the bucket name, set `SUPABASE_STORAGE_BUCKET` to match.

## 5. Resend configuration

- Create an API key in Resend and set `RESEND_API_KEY`.
- Verify the sending domain in Resend and set `FORM_FROM_EMAIL` to an address on
  that domain.
- Set `FORM_NOTIFICATION_EMAIL` to the inbox that should receive submissions.
- No production recipient/sender is hardcoded anywhere — all come from env vars.

## 6. How the future form submission flow will work

The design avoids sending large video/file bytes through the serverless function
(which would hit Vercel payload limits). It uses **direct-to-storage** uploads:

```
1. User fills a form and selects a file/video.
2. Browser → POST /api/forms/create-upload-url
     sends only metadata: { formKey, category, contentType, sizeBytes }
   Server validates metadata and returns a short-lived signed upload URL.
3. Browser uploads the file DIRECTLY to Supabase Storage using that signed URL.
     (The bytes never pass through the Vercel function. No base64.)
4. Browser → POST /api/forms/submit
     sends { formKey, fields, replyTo?, filePath }
   Server validates + sanitizes the fields, creates a short-lived signed
   download URL for filePath, and sends a Resend notification email containing
   the submitted data and the secure file link.
```

Both endpoints are **form-agnostic**, so each future form reuses the same
validation, storage, and email utilities by passing its own `formKey` and fields.

## 7. How to test the backend

The health check confirms the backend is deployed and reports which integrations
are configured (booleans only — never any secret value):

```bash
curl https://<your-deployment>/api/health
```

Expected response:

```json
{
  "success": true,
  "status": "operational",
  "timestamp": "2025-01-01T00:00:00.000Z",
  "configured": {
    "supabase": { "url": true, "serviceRoleKey": true, "bucket": false },
    "email": { "apiKey": false, "fromEmail": false, "notificationEmail": false }
  }
}
```

`false` entries indicate variables that still require manual configuration.

Locally, `vite` alone does not run the `/api` functions. Use `vercel dev` to
exercise the endpoints in development.

## 8. What is intentionally NOT connected yet

- No existing form posts to these endpoints. The Contact, Let's Talk, Share Your
  Story, and Enquiry forms and their UI are **unchanged**.
- No test emails are sent from any existing form.
- No production credentials are committed. `RESEND_API_KEY`,
  `FORM_NOTIFICATION_EMAIL`, and `FORM_FROM_EMAIL` still require manual setup.
- Room is intentionally left to add rate limiting, CAPTCHA/Turnstile, and spam
  protection before these endpoints are exposed to real traffic.
