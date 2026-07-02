# Cloudflare Contact Intake Setup

This project now includes a Cloudflare Worker + D1 path for storing contact form submissions.

## Architecture

- Vercel serves the website.
- The contact page submits JSON to a Cloudflare Worker endpoint.
- The Worker validates the payload and stores it in a Cloudflare D1 database.
- If the save endpoint is unavailable, the page falls back to WhatsApp so leads are not lost.

## Recommended production shape

Best option:

- Put the Worker on `https://api.soulinfinity.space/api/contact` or route it through `https://www.soulinfinity.space/api/contact`.
- Set `VITE_CONTACT_API_URL` in Vercel to that endpoint for preview and production.

## Files

- Worker source: [cloudflare/contact-intake/src/index.js](/Users/saurabhiim/Documents/Antigravity/SIAS-5.0-main/cloudflare/contact-intake/src/index.js)
- Wrangler config: [cloudflare/contact-intake/wrangler.toml](/Users/saurabhiim/Documents/Antigravity/SIAS-5.0-main/cloudflare/contact-intake/wrangler.toml)
- D1 schema: [cloudflare/contact-intake/schema.sql](/Users/saurabhiim/Documents/Antigravity/SIAS-5.0-main/cloudflare/contact-intake/schema.sql)

## One-time setup

1. Log in to Cloudflare:

```bash
npx wrangler@latest login
```

2. Create the D1 database:

```bash
cd /Users/saurabhiim/Documents/Antigravity/SIAS-5.0-main/cloudflare/contact-intake
npx wrangler@latest d1 create soul-infinity-contact
```

3. Copy the returned `database_id` into [cloudflare/contact-intake/wrangler.toml](/Users/saurabhiim/Documents/Antigravity/SIAS-5.0-main/cloudflare/contact-intake/wrangler.toml:7).

4. Apply the schema remotely:

```bash
npx wrangler@latest d1 execute soul-infinity-contact --remote --file=./schema.sql
```

5. Optional but recommended: add a custom Worker route.

Examples:

- `api.soulinfinity.space/*`
- `www.soulinfinity.space/api/*`

## Environment variables

### Cloudflare Worker variables

Set `ALLOWED_ORIGINS` as a comma-separated string if you want stricter origin control.

Example:

```text
https://www.soulinfinity.space,https://soulinfinity.space,https://soul-infinity-mnj7ptp89-saurabh-bits-pilanis-projects.vercel.app
```

### Vercel variables

Set `VITE_CONTACT_API_URL`.

Example:

```text
https://api.soulinfinity.space/api/contact
```

If you place the Worker on the same domain under `/api/contact`, this variable can be omitted because the frontend already defaults to `/api/contact`.

## Deploy the Worker

```bash
cd /Users/saurabhiim/Documents/Antigravity/SIAS-5.0-main/cloudflare/contact-intake
npx wrangler@latest deploy
```

## Verify

1. Open the contact page.
2. Submit a test entry.
3. Confirm a `201` response from the Worker.
4. Query D1:

```bash
npx wrangler@latest d1 execute soul-infinity-contact --remote --command "SELECT id, full_name, email_address, created_at FROM contact_submissions ORDER BY created_at DESC LIMIT 10"
```

## Notes

- The Worker allows `localhost`, production domains, and `.vercel.app` by default.
- A hidden `website` honeypot field is included to reduce low-effort bot spam.
- The contact page remains usable even before Worker deployment because it falls back to WhatsApp on save failure.
