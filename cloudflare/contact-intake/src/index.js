const MONTH_INDEX = {
  January: 0,
  February: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5,
  July: 6,
  August: 7,
  September: 8,
  October: 9,
  November: 10,
  December: 11,
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[+\d][\d\s\-()]{6,20}$/;
const SESSION_LIFETIME_DAYS = 30;
const DEFAULT_LINK_EXPIRY_HOURS = 72;
const textEncoder = new TextEncoder();

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function unauthorizedResponse() {
  return new Response('Authentication required.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Soul Infinity Leads Preview"',
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}

function isAuthorized(request, env) {
  const expectedUser = env.ADMIN_USERNAME;
  const expectedPassword = env.ADMIN_PASSWORD;

  if (!expectedUser || !expectedPassword) {
    return false;
  }

  const authorization = request.headers.get('Authorization');
  if (!authorization || !authorization.startsWith('Basic ')) {
    return false;
  }

  try {
    const decoded = atob(authorization.slice(6));
    const separatorIndex = decoded.indexOf(':');
    if (separatorIndex === -1) {
      return false;
    }

    const username = decoded.slice(0, separatorIndex);
    const password = decoded.slice(separatorIndex + 1);
    return username === expectedUser && password === expectedPassword;
  } catch {
    return false;
  }
}

function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      ...headers,
    },
  });
}

function getCorsHeaders(origin, env) {
  const allowedOrigin = isAllowedOrigin(origin, env) ? origin : 'null';
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  };
}

function isAllowedOrigin(origin, env) {
  if (!origin) {
    return false;
  }

  const configuredOrigins = (env.ALLOWED_ORIGINS || '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);

  if (configuredOrigins.includes(origin)) {
    return true;
  }

  return (
    origin === 'https://www.soulinfinity.space' ||
    origin === 'https://soulinfinity.space' ||
    origin === 'http://localhost:5173' ||
    origin.endsWith('.vercel.app')
  );
}

function formatIstTimestamp(value) {
  if (!value) {
    return '';
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  const formatter = new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  return `${formatter.format(date)} IST`;
}

function formatBirthDate(row) {
  const day = Number(row.birth_day);
  const year = Number(row.birth_year);
  const month = String(row.birth_month || '').trim();

  if (!Number.isInteger(day) || !Number.isInteger(year) || !month) {
    return '';
  }

  return `${String(day).padStart(2, '0')} ${month} ${year}`;
}

function formatBirthTime(row) {
  const hour = Number(row.birth_hour);
  const minute = Number(row.birth_minute);
  const second = Number(row.birth_second);
  const storedMeridiem = String(row.birth_meridiem || '').trim().toUpperCase();

  if (
    !Number.isInteger(hour) ||
    !Number.isInteger(minute) ||
    !Number.isInteger(second)
  ) {
    return '';
  }

  const meridiem = storedMeridiem || (hour >= 12 ? 'PM' : 'AM');

  if (meridiem === 'AM' || meridiem === 'PM') {
    const hour12 = hour % 12 === 0 ? 12 : hour % 12;
    return `${String(hour12).padStart(2, '0')}:${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')} ${meridiem}`;
  }

  return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')}`;
}

function formatPortalDate(value) {
  if (!value) {
    return '';
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(date);
}

function normalizeEmail(value) {
  return String(value || '').trim().toLowerCase();
}

function maskEmail(email) {
  const normalized = normalizeEmail(email);
  const [local, domain] = normalized.split('@');
  if (!local || !domain) {
    return normalized;
  }

  const localMask =
    local.length <= 2 ? `${local[0] || ''}*` : `${local.slice(0, 2)}${'*'.repeat(Math.max(1, local.length - 2))}`;
  return `${localMask}@${domain}`;
}

function parseInteger(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) ? Math.trunc(number) : fallback;
}

function parseBoolean(value) {
  if (typeof value === 'boolean') {
    return value;
  }

  const normalized = String(value || '').trim().toLowerCase();
  return (
    normalized === 'true' ||
    normalized === '1' ||
    normalized === 'yes' ||
    normalized === 'on'
  );
}

function buildPortalBaseUrl(candidate, env) {
  const raw = String(candidate || env.PORTAL_SITE_URL || 'https://www.soulinfinity.space').trim();

  try {
    const url = new URL(raw);
    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
      return 'https://www.soulinfinity.space';
    }

    return `${url.origin}${url.pathname}`.replace(/\/$/, '');
  } catch {
    return 'https://www.soulinfinity.space';
  }
}

function buildPortalLink(baseUrl, token) {
  return `${baseUrl}/my-analysis?token=${encodeURIComponent(token)}`;
}

function getBearerToken(request) {
  const authorization = request.headers.get('Authorization') || '';
  if (!authorization.startsWith('Bearer ')) {
    return '';
  }

  return authorization.slice(7).trim();
}

function createRawToken() {
  return crypto.randomUUID().replaceAll('-', '') + crypto.randomUUID().replaceAll('-', '');
}

async function sha256Hex(value) {
  const digest = await crypto.subtle.digest('SHA-256', textEncoder.encode(String(value)));
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

async function parseBody(request) {
  const contentType = request.headers.get('Content-Type') || '';

  if (contentType.includes('application/json')) {
    return await request.json();
  }

  if (
    contentType.includes('application/x-www-form-urlencoded') ||
    contentType.includes('multipart/form-data')
  ) {
    const formData = await request.formData();
    return Object.fromEntries(formData.entries());
  }

  return {};
}

function validatePayload(data) {
  const errors = [];

  if (!data || typeof data !== 'object') {
    return ['Invalid request payload.'];
  }

  if (typeof data.website === 'string' && data.website.trim()) {
    errors.push('Spam protection triggered.');
  }

  if (!String(data.fullName || '').trim()) {
    errors.push('Full name is required.');
  }

  if (!EMAIL_PATTERN.test(String(data.emailAddress || ''))) {
    errors.push('Valid email address is required.');
  }

  if (!PHONE_PATTERN.test(String(data.phoneNumber || ''))) {
    errors.push('Valid phone number is required.');
  }

  if (!String(data.country || '').trim()) {
    errors.push('Country is required.');
  }

  if (!String(data.placeOfBirth || '').trim()) {
    errors.push('Place of birth is required.');
  }

  if (!String(data.gender || '').trim()) {
    errors.push('Gender is required.');
  }

  const monthIdx = MONTH_INDEX[String(data.birthMonth || '')];
  const day = Number(data.birthDay);
  const year = Number(data.birthYear);
  if (!Number.isInteger(day) || !Number.isInteger(year) || monthIdx === undefined) {
    errors.push('Complete date of birth is required.');
  } else {
    const probe = new Date(year, monthIdx, day);
    const valid =
      probe.getFullYear() === year &&
      probe.getMonth() === monthIdx &&
      probe.getDate() === day;

    if (!valid) {
      errors.push('Date of birth is not valid.');
    }
  }

  const hour = Number(data.birthHour);
  const minute = Number(data.birthMinute);
  const second = Number(data.birthSecond);
  const meridiem = String(data.birthMeridiem || '').trim().toUpperCase();
  if (
    !Number.isInteger(hour) ||
    hour < 0 ||
    hour > 23 ||
    !Number.isInteger(minute) ||
    minute < 0 ||
    minute > 59 ||
    !Number.isInteger(second) ||
    second < 0 ||
    second > 59
  ) {
    errors.push('Complete time of birth is required.');
  }

  if (meridiem && !['AM', 'PM'].includes(meridiem)) {
    errors.push('Birth meridiem must be AM or PM.');
  }

  const preferredLanguage = String(data.preferredLanguage || '').trim();
  if (preferredLanguage && !['English', 'Hindi'].includes(preferredLanguage)) {
    errors.push('Preferred language is required.');
  }

  const discussionMode = String(data.discussionMode || '').trim();
  if (discussionMode && !['On call', 'On chat'].includes(discussionMode)) {
    errors.push('Discussion mode is required.');
  }

  return errors;
}

async function loadPortalProfile(env, email) {
  const result = await env.CONTACT_DB.prepare(
    `SELECT
      id,
      full_name,
      email_address,
      phone_number,
      country,
      place_of_birth,
      preferred_language,
      discussion_mode,
      created_at
    FROM contact_submissions
    WHERE email_address = ?
    ORDER BY created_at DESC
    LIMIT 1`
  )
    .bind(email)
    .first();

  if (!result) {
    return null;
  }

  return {
    submissionId: result.id,
    fullName: result.full_name,
    emailAddress: result.email_address,
    phoneNumber: result.phone_number,
    country: result.country,
    placeOfBirth: result.place_of_birth,
    preferredLanguage: result.preferred_language,
    discussionMode: result.discussion_mode,
    createdAt: result.created_at,
  };
}

async function loadPortalReports(env, email) {
  const result = await env.CONTACT_DB.prepare(
    `SELECT
      ar.id,
      ar.submission_id,
      ar.title,
      ar.report_type,
      ar.report_body,
      ar.visible_to_client,
      ar.created_at,
      ar.updated_at,
      ar.published_at,
      cs.full_name,
      cs.country,
      cs.place_of_birth
    FROM analysis_reports ar
    INNER JOIN contact_submissions cs
      ON cs.id = ar.submission_id
    WHERE cs.email_address = ?
      AND ar.visible_to_client = 1
    ORDER BY
      CASE WHEN ar.published_at = '' THEN ar.created_at ELSE ar.published_at END DESC,
      ar.updated_at DESC`
  )
    .bind(email)
    .all();

  return (result.results || []).map((row) => ({
    id: row.id,
    submissionId: row.submission_id,
    title: row.title,
    reportType: row.report_type,
    reportBody: row.report_body,
    visibleToClient: Boolean(row.visible_to_client),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    publishedAt: row.published_at,
    fullName: row.full_name,
    country: row.country,
    placeOfBirth: row.place_of_birth,
  }));
}

async function buildPortalSessionPayload(env, email) {
  const profile = await loadPortalProfile(env, email);
  const reports = await loadPortalReports(env, email);

  return {
    client: profile,
    reports,
  };
}

async function resolvePortalSession(env, request) {
  const rawToken = getBearerToken(request);
  if (!rawToken) {
    return null;
  }

  const tokenHash = await sha256Hex(rawToken);
  const session = await env.CONTACT_DB.prepare(
    `SELECT
      id,
      submission_id,
      email_address,
      expires_at,
      revoked_at
    FROM portal_sessions
    WHERE session_token_hash = ?
    LIMIT 1`
  )
    .bind(tokenHash)
    .first();

  if (!session || session.revoked_at) {
    return null;
  }

  if (new Date(session.expires_at).getTime() <= Date.now()) {
    return null;
  }

  await env.CONTACT_DB.prepare(
    `UPDATE portal_sessions
    SET last_used_at = ?
    WHERE id = ?`
  )
    .bind(new Date().toISOString(), session.id)
    .run();

  return session;
}

async function createPortalSession(env, submissionId, emailAddress) {
  const now = new Date();
  const sessionToken = createRawToken();
  const sessionTokenHash = await sha256Hex(sessionToken);
  const expiresAt = new Date(now.getTime() + SESSION_LIFETIME_DAYS * 24 * 60 * 60 * 1000).toISOString();
  const createdAt = now.toISOString();

  await env.CONTACT_DB.prepare(
    `INSERT INTO portal_sessions (
      id,
      submission_id,
      email_address,
      session_token_hash,
      expires_at,
      revoked_at,
      created_at,
      last_used_at
    ) VALUES (?, ?, ?, ?, ?, '', ?, ?)`
  )
    .bind(
      crypto.randomUUID(),
      submissionId,
      emailAddress,
      sessionTokenHash,
      expiresAt,
      createdAt,
      createdAt,
    )
    .run();

  return {
    sessionToken,
    expiresAt,
  };
}

function renderLeadsHtml(rows) {
  const tableRows = rows
    .map(
      (row) => `
        <tr>
          <td>${escapeHtml(formatIstTimestamp(row.created_at))}</td>
          <td>${escapeHtml(row.full_name)}</td>
          <td>${escapeHtml(formatBirthDate(row))}</td>
          <td>${escapeHtml(formatBirthTime(row))}</td>
          <td><a href="tel:${escapeHtml(row.phone_number)}">${escapeHtml(row.phone_number)}</a></td>
          <td><a href="mailto:${escapeHtml(row.email_address)}">${escapeHtml(row.email_address)}</a></td>
          <td>${escapeHtml(row.country)}</td>
          <td>${escapeHtml(row.place_of_birth)}</td>
          <td>${escapeHtml(row.preferred_language || '')}</td>
          <td>${escapeHtml(row.discussion_mode || '')}</td>
          <td>${escapeHtml(row.gender)}</td>
          <td>${escapeHtml(row.message_text || '')}</td>
          <td>${escapeHtml(row.source_page || '')}</td>
        </tr>`
    )
    .join('');

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Soul Infinity Leads Preview</title>
    <style>
      :root {
        color-scheme: light;
        --bg: #f7f1e6;
        --ink: #1f2937;
        --muted: #6b7280;
        --navy: #111827;
        --gold: #c89b3c;
        --card: #fffdf8;
        --line: #e7dcc7;
      }
      * { box-sizing: border-box; }
      body { margin: 0; font-family: Arial, sans-serif; background: linear-gradient(180deg, #f8f3ea 0%, #f3ecdf 100%); color: var(--ink); }
      .wrap { max-width: 1440px; margin: 0 auto; padding: 32px 20px 48px; }
      .hero { background: linear-gradient(135deg, rgba(17,24,39,0.98), rgba(39,51,74,0.95)); color: #f9edd6; border-radius: 28px; padding: 28px; box-shadow: 0 24px 70px rgba(17,24,39,0.18); }
      .eyebrow { color: #eac36b; font-size: 12px; letter-spacing: 0.22em; text-transform: uppercase; font-weight: 700; }
      h1 { margin: 12px 0 8px; font-size: 40px; line-height: 1.1; }
      .sub { color: #e5d7bb; max-width: 720px; font-size: 16px; line-height: 1.7; }
      .nav { display: flex; gap: 12px; margin-top: 18px; flex-wrap: wrap; }
      .nav a { display: inline-flex; align-items: center; justify-content: center; padding: 10px 14px; border-radius: 999px; color: white; text-decoration: none; border: 1px solid rgba(255,255,255,0.15); background: rgba(255,255,255,0.08); }
      .stats { display: flex; gap: 16px; flex-wrap: wrap; margin-top: 20px; }
      .stat { background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12); border-radius: 18px; padding: 14px 18px; min-width: 180px; }
      .stat strong { display: block; color: white; font-size: 26px; }
      .card { margin-top: 24px; background: var(--card); border: 1px solid var(--line); border-radius: 24px; overflow: hidden; box-shadow: 0 18px 40px rgba(120, 93, 47, 0.08); }
      .card-head { padding: 18px 22px; border-bottom: 1px solid var(--line); display: flex; justify-content: space-between; gap: 12px; align-items: center; flex-wrap: wrap; }
      .card-head h2 { margin: 0; font-size: 20px; }
      .card-head p { margin: 0; color: var(--muted); font-size: 14px; }
      .table-wrap { overflow: auto; }
      table { width: 100%; border-collapse: collapse; min-width: 1100px; }
      th, td { padding: 14px 16px; text-align: left; vertical-align: top; border-bottom: 1px solid var(--line); font-size: 14px; }
      th { position: sticky; top: 0; background: #fbf6ed; color: #6e5530; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; }
      td a { color: #80581f; text-decoration: none; }
      td a:hover { text-decoration: underline; }
      .empty { padding: 40px 24px; color: var(--muted); }
    </style>
  </head>
  <body>
    <div class="wrap">
      <section class="hero">
        <div class="eyebrow">Cloudflare Workers Preview</div>
        <h1>Soul Infinity Leads Table</h1>
        <p class="sub">This preview reads directly from Cloudflare D1 and lists the most recent saved contact submissions, newest first.</p>
        <div class="nav">
          <a href="/admin/leads">Leads</a>
          <a href="/admin/portal">Portal Admin</a>
        </div>
        <div class="stats">
          <div class="stat">
            <span>Total visible rows</span>
            <strong>${rows.length}</strong>
          </div>
          <div class="stat">
            <span>Data order</span>
            <strong>Newest first</strong>
          </div>
        </div>
      </section>

      <section class="card">
        <div class="card-head">
          <div>
            <h2>Latest saved contacts</h2>
            <p>Date-wise entries from Cloudflare D1</p>
          </div>
        </div>
        <div class="table-wrap">
          ${
            rows.length > 0
              ? `<table>
                  <thead>
                    <tr>
                      <th>Created At (IST)</th>
                      <th>Name</th>
                      <th>Birth Date</th>
                      <th>Birth Time</th>
                      <th>Phone</th>
                      <th>Email</th>
                      <th>Country</th>
                      <th>Place of Birth</th>
                      <th>Language</th>
                      <th>Discussion Mode</th>
                      <th>Gender</th>
                      <th>Message</th>
                      <th>Source</th>
                    </tr>
                  </thead>
                  <tbody>${tableRows}</tbody>
                </table>`
              : `<div class="empty">No records have been saved yet.</div>`
          }
        </div>
      </section>
    </div>
  </body>
</html>`;
}

function renderPortalAdminHtml(leads, reports, defaultPortalBase) {
  const leadOptions = leads
    .map(
      (lead) => `<option value="${escapeHtml(lead.id)}">${escapeHtml(lead.full_name)} | ${escapeHtml(lead.email_address)} | ${escapeHtml(formatIstTimestamp(lead.created_at))}</option>`
    )
    .join('');

  const reportRows = reports
    .map(
      (report) => `<tr>
        <td>${escapeHtml(formatPortalDate(report.updated_at))}</td>
        <td>${escapeHtml(report.full_name)}</td>
        <td>${escapeHtml(report.email_address)}</td>
        <td>${escapeHtml(report.title)}</td>
        <td>${escapeHtml(report.report_type)}</td>
        <td>${report.visible_to_client ? 'Visible' : 'Draft'}</td>
      </tr>`
    )
    .join('');

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Soul Infinity Portal Admin</title>
    <style>
      :root {
        color-scheme: light;
        --bg: #f7f1e6;
        --ink: #1f2937;
        --muted: #6b7280;
        --navy: #111827;
        --gold: #c89b3c;
        --card: #fffdf8;
        --line: #e7dcc7;
        --green: #0f766e;
        --red: #b91c1c;
      }
      * { box-sizing: border-box; }
      body { margin: 0; font-family: Arial, sans-serif; background: linear-gradient(180deg, #f8f3ea 0%, #f3ecdf 100%); color: var(--ink); }
      .wrap { max-width: 1440px; margin: 0 auto; padding: 32px 20px 48px; }
      .hero { background: linear-gradient(135deg, rgba(17,24,39,0.98), rgba(39,51,74,0.95)); color: #f9edd6; border-radius: 28px; padding: 28px; box-shadow: 0 24px 70px rgba(17,24,39,0.18); }
      .eyebrow { color: #eac36b; font-size: 12px; letter-spacing: 0.22em; text-transform: uppercase; font-weight: 700; }
      h1 { margin: 12px 0 8px; font-size: 40px; line-height: 1.1; }
      .sub { color: #e5d7bb; max-width: 820px; font-size: 16px; line-height: 1.7; }
      .nav { display: flex; gap: 12px; margin-top: 18px; flex-wrap: wrap; }
      .nav a { display: inline-flex; align-items: center; justify-content: center; padding: 10px 14px; border-radius: 999px; color: white; text-decoration: none; border: 1px solid rgba(255,255,255,0.15); background: rgba(255,255,255,0.08); }
      .grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px; margin-top: 24px; }
      .card { background: var(--card); border: 1px solid var(--line); border-radius: 24px; overflow: hidden; box-shadow: 0 18px 40px rgba(120, 93, 47, 0.08); }
      .card-head { padding: 18px 22px; border-bottom: 1px solid var(--line); }
      .card-head h2 { margin: 0; font-size: 20px; }
      .card-head p { margin: 6px 0 0; color: var(--muted); font-size: 14px; }
      .card-body { padding: 22px; }
      label { display: block; margin-bottom: 6px; font-size: 13px; color: #5b4b32; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; }
      input, select, textarea { width: 100%; padding: 12px 14px; border-radius: 14px; border: 1px solid #d5c7ae; background: white; font: inherit; }
      textarea { min-height: 180px; resize: vertical; }
      .field { margin-bottom: 16px; }
      .row { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
      button { border: 0; border-radius: 999px; background: var(--navy); color: white; padding: 12px 18px; font-weight: 700; cursor: pointer; }
      button.secondary { background: #f0e5d0; color: #5b4b32; border: 1px solid #d5c7ae; }
      .status { margin-top: 14px; padding: 14px 16px; border-radius: 16px; display: none; }
      .status.show { display: block; }
      .status.success { background: #ecfdf5; color: var(--green); border: 1px solid #a7f3d0; }
      .status.error { background: #fef2f2; color: var(--red); border: 1px solid #fecaca; }
      .status code { display: block; white-space: pre-wrap; overflow-wrap: anywhere; margin-top: 8px; }
      table { width: 100%; border-collapse: collapse; }
      th, td { padding: 14px 16px; text-align: left; vertical-align: top; border-bottom: 1px solid var(--line); font-size: 14px; }
      th { background: #fbf6ed; color: #6e5530; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; }
      .notes { color: var(--muted); font-size: 13px; line-height: 1.6; }
      .mono { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; }
      @media (max-width: 960px) {
        .grid, .row { grid-template-columns: 1fr; }
        h1 { font-size: 30px; }
      }
    </style>
  </head>
  <body>
    <div class="wrap">
      <section class="hero">
        <div class="eyebrow">Staging Portal Build</div>
        <h1>Analysis Portal Admin</h1>
        <p class="sub">Phase 1 staging admin for writing astrology analyses, publishing them to a client history, and generating a secure website link that opens the client portal on Soul Infinity first.</p>
        <div class="nav">
          <a href="/admin/leads">Leads Table</a>
          <a href="/admin/portal">Portal Admin</a>
        </div>
      </section>

      <div class="grid">
        <section class="card">
          <div class="card-head">
            <h2>Create Or Update Analysis</h2>
            <p>Write a report against a saved lead. Visible reports appear in the client portal history.</p>
          </div>
          <div class="card-body">
            <form id="report-form">
              <div class="field">
                <label for="submissionId">Lead</label>
                <select id="submissionId" name="submissionId" required>
                  <option value="">Select a saved lead</option>
                  ${leadOptions}
                </select>
              </div>
              <div class="row">
                <div class="field">
                  <label for="title">Report Title</label>
                  <input id="title" name="title" type="text" placeholder="Kundali Analysis - July 2026" required />
                </div>
                <div class="field">
                  <label for="reportType">Report Type</label>
                  <input id="reportType" name="reportType" type="text" value="Kundali Analysis" />
                </div>
              </div>
              <div class="field">
                <label for="reportBody">Analysis Body</label>
                <textarea id="reportBody" name="reportBody" placeholder="Write the astrology analysis here..." required></textarea>
              </div>
              <div class="field">
                <label for="adminNotes">Admin Notes</label>
                <textarea id="adminNotes" name="adminNotes" placeholder="Private follow-up notes, reminders, or delivery instructions..."></textarea>
              </div>
              <div class="field">
                <label><input type="checkbox" name="visibleToClient" style="width:auto; margin-right:8px;" /> Visible to client now</label>
              </div>
              <button type="submit">Save Analysis</button>
            </form>
            <div id="report-status" class="status"></div>
          </div>
        </section>

        <section class="card">
          <div class="card-head">
            <h2>Generate Client Access Link</h2>
            <p>Create a secure website link for the selected lead. In this staging phase, the generated link can be copied into your email manually.</p>
          </div>
          <div class="card-body">
            <form id="link-form">
              <div class="field">
                <label for="linkSubmissionId">Lead</label>
                <select id="linkSubmissionId" name="submissionId" required>
                  <option value="">Select a saved lead</option>
                  ${leadOptions}
                </select>
              </div>
              <div class="row">
                <div class="field">
                  <label for="portalBaseUrl">Portal Base URL</label>
                  <input id="portalBaseUrl" name="portalBaseUrl" type="text" value="${escapeHtml(defaultPortalBase)}" required />
                </div>
                <div class="field">
                  <label for="expiryHours">Expiry Hours</label>
                  <input id="expiryHours" name="expiryHours" type="number" min="1" max="720" value="${DEFAULT_LINK_EXPIRY_HOURS}" required />
                </div>
              </div>
              <button type="submit">Generate Secure Link</button>
            </form>
            <div class="notes">
              The generated link opens <span class="mono">/my-analysis</span> on your website first, so all analysis views route through Soul Infinity.
            </div>
            <div id="link-status" class="status"></div>
          </div>
        </section>
      </div>

      <section class="card" style="margin-top:24px;">
        <div class="card-head">
          <h2>Recent Published And Draft Reports</h2>
          <p>Latest portal entries linked to existing leads.</p>
        </div>
        <div class="card-body" style="padding:0;">
          ${
            reports.length > 0
              ? `<table>
                  <thead>
                    <tr>
                      <th>Updated</th>
                      <th>Client</th>
                      <th>Email</th>
                      <th>Title</th>
                      <th>Type</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>${reportRows}</tbody>
                </table>`
              : `<div class="notes" style="padding:22px;">No portal analyses have been created yet.</div>`
          }
        </div>
      </section>
    </div>

    <script>
      async function postJson(url, payload) {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        const body = await response.json().catch(() => ({}));
        if (!response.ok) {
          throw new Error(body.error || 'Request failed');
        }
        return body;
      }

      function showStatus(elementId, tone, title, detail) {
        const node = document.getElementById(elementId);
        node.className = 'status show ' + tone;
        node.innerHTML = '<strong>' + title + '</strong>' + (detail ? '<code>' + detail.replaceAll('<', '&lt;') + '</code>' : '');
      }

      document.getElementById('report-form').addEventListener('submit', async (event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const payload = Object.fromEntries(form.entries());
        payload.visibleToClient = form.get('visibleToClient') === 'on';

        try {
          const result = await postJson('/api/admin/reports', payload);
          showStatus('report-status', 'success', 'Analysis saved successfully.', JSON.stringify(result, null, 2));
        } catch (error) {
          showStatus('report-status', 'error', 'Unable to save analysis.', error instanceof Error ? error.message : String(error));
        }
      });

      document.getElementById('link-form').addEventListener('submit', async (event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const payload = Object.fromEntries(form.entries());

        try {
          const result = await postJson('/api/admin/access-links', payload);
          showStatus('link-status', 'success', 'Secure link generated.', result.portalLink || JSON.stringify(result, null, 2));
        } catch (error) {
          showStatus('link-status', 'error', 'Unable to generate link.', error instanceof Error ? error.message : String(error));
        }
      });
    </script>
  </body>
</html>`;
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const corsHeaders = getCorsHeaders(origin, env);
    const url = new URL(request.url);

    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: corsHeaders,
      });
    }

    if (url.pathname === '/api/contact' && request.method === 'GET') {
      return json(
        {
          ok: true,
          service: 'contact-intake',
        },
        200,
        corsHeaders,
      );
    }

    if (url.pathname === '/api/portal/health' && request.method === 'GET') {
      return json(
        {
          ok: true,
          service: 'analysis-portal',
        },
        200,
        corsHeaders,
      );
    }

    if (url.pathname === '/admin/leads' && request.method === 'GET') {
      if (!isAuthorized(request, env)) {
        return unauthorizedResponse();
      }

      const results = await env.CONTACT_DB.prepare(
        `SELECT
          id,
          full_name,
          birth_day,
          birth_month,
          birth_year,
          birth_hour,
          birth_meridiem,
          birth_minute,
          birth_second,
          phone_number,
          email_address,
          country,
          place_of_birth,
          preferred_language,
          discussion_mode,
          gender,
          message_text,
          source_page,
          created_at
        FROM contact_submissions
        ORDER BY created_at DESC
        LIMIT 500`
      ).all();

      return new Response(renderLeadsHtml(results.results || []), {
        status: 200,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'no-store',
        },
      });
    }

    if (url.pathname === '/admin/portal' && request.method === 'GET') {
      if (!isAuthorized(request, env)) {
        return unauthorizedResponse();
      }

      const [leadsResult, reportsResult] = await Promise.all([
        env.CONTACT_DB.prepare(
          `SELECT
            id,
            full_name,
            email_address,
            created_at
          FROM contact_submissions
          ORDER BY created_at DESC
          LIMIT 250`
        ).all(),
        env.CONTACT_DB.prepare(
          `SELECT
            ar.id,
            ar.title,
            ar.report_type,
            ar.visible_to_client,
            ar.updated_at,
            cs.full_name,
            cs.email_address
          FROM analysis_reports ar
          INNER JOIN contact_submissions cs
            ON cs.id = ar.submission_id
          ORDER BY ar.updated_at DESC
          LIMIT 100`
        ).all(),
      ]);

      return new Response(
        renderPortalAdminHtml(
          leadsResult.results || [],
          reportsResult.results || [],
          buildPortalBaseUrl('', env),
        ),
        {
          status: 200,
          headers: {
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': 'no-store',
          },
        },
      );
    }

    if (url.pathname === '/api/admin/reports' && request.method === 'POST') {
      if (!isAuthorized(request, env)) {
        return unauthorizedResponse();
      }

      const payload = await parseBody(request);
      const submissionId = String(payload.submissionId || '').trim();
      const title = String(payload.title || '').trim();
      const reportType = String(payload.reportType || 'Kundali Analysis').trim() || 'Kundali Analysis';
      const reportBody = String(payload.reportBody || '').trim();
      const adminNotes = String(payload.adminNotes || '').trim();
      const visibleToClient = parseBoolean(payload.visibleToClient);

      if (!submissionId || !title || !reportBody) {
        return json({ error: 'Lead, report title, and analysis body are required.' }, 400, corsHeaders);
      }

      const submission = await env.CONTACT_DB.prepare(
        `SELECT id, email_address
        FROM contact_submissions
        WHERE id = ?
        LIMIT 1`
      )
        .bind(submissionId)
        .first();

      if (!submission) {
        return json({ error: 'Selected lead was not found.' }, 404, corsHeaders);
      }

      const now = new Date().toISOString();
      const reportId = crypto.randomUUID();

      await env.CONTACT_DB.prepare(
        `INSERT INTO analysis_reports (
          id,
          submission_id,
          title,
          report_type,
          report_body,
          admin_notes,
          visible_to_client,
          created_at,
          updated_at,
          published_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      )
        .bind(
          reportId,
          submissionId,
          title,
          reportType,
          reportBody,
          adminNotes,
          visibleToClient ? 1 : 0,
          now,
          now,
          visibleToClient ? now : '',
        )
        .run();

      return json(
        {
          ok: true,
          reportId,
          submissionId,
          emailAddress: submission.email_address,
          visibleToClient,
          savedAt: now,
        },
        201,
        corsHeaders,
      );
    }

    if (url.pathname === '/api/admin/access-links' && request.method === 'POST') {
      if (!isAuthorized(request, env)) {
        return unauthorizedResponse();
      }

      const payload = await parseBody(request);
      const submissionId = String(payload.submissionId || '').trim();
      const portalBaseUrl = buildPortalBaseUrl(payload.portalBaseUrl, env);
      const expiryHours = Math.min(Math.max(parseInteger(payload.expiryHours, DEFAULT_LINK_EXPIRY_HOURS), 1), 720);

      if (!submissionId) {
        return json({ error: 'Lead selection is required.' }, 400, corsHeaders);
      }

      const submission = await env.CONTACT_DB.prepare(
        `SELECT
          id,
          full_name,
          email_address
        FROM contact_submissions
        WHERE id = ?
        LIMIT 1`
      )
        .bind(submissionId)
        .first();

      if (!submission) {
        return json({ error: 'Selected lead was not found.' }, 404, corsHeaders);
      }

      const rawToken = createRawToken();
      const tokenHash = await sha256Hex(rawToken);
      const now = new Date();
      const createdAt = now.toISOString();
      const expiresAt = new Date(now.getTime() + expiryHours * 60 * 60 * 1000).toISOString();
      const linkId = crypto.randomUUID();

      await env.CONTACT_DB.prepare(
        `INSERT INTO portal_access_links (
          id,
          submission_id,
          email_address,
          token_hash,
          expires_at,
          consumed_at,
          created_at
        ) VALUES (?, ?, ?, ?, ?, '', ?)`
      )
        .bind(
          linkId,
          submissionId,
          submission.email_address,
          tokenHash,
          expiresAt,
          createdAt,
        )
        .run();

      const portalLink = buildPortalLink(portalBaseUrl, rawToken);
      return json(
        {
          ok: true,
          linkId,
          portalLink,
          emailAddress: submission.email_address,
          fullName: submission.full_name,
          expiresAt,
          deliveryMode: 'manual-share-until-email-integration',
        },
        201,
        corsHeaders,
      );
    }

    if (url.pathname === '/api/portal/redeem-link' && request.method === 'POST') {
      if (origin && !isAllowedOrigin(origin, env)) {
        return json({ error: 'Origin not allowed.' }, 403, corsHeaders);
      }

      let payload;
      try {
        payload = await parseBody(request);
      } catch {
        return json({ error: 'Invalid request body.' }, 400, corsHeaders);
      }

      const token = String(payload.token || '').trim();
      if (!token) {
        return json({ error: 'Access token is required.' }, 400, corsHeaders);
      }

      const tokenHash = await sha256Hex(token);
      const accessLink = await env.CONTACT_DB.prepare(
        `SELECT
          id,
          submission_id,
          email_address,
          expires_at,
          consumed_at
        FROM portal_access_links
        WHERE token_hash = ?
        LIMIT 1`
      )
        .bind(tokenHash)
        .first();

      if (!accessLink) {
        return json({ error: 'This access link is not valid.' }, 404, corsHeaders);
      }

      if (accessLink.consumed_at) {
        return json({ error: 'This access link has already been used.' }, 410, corsHeaders);
      }

      if (new Date(accessLink.expires_at).getTime() <= Date.now()) {
        return json({ error: 'This access link has expired.' }, 410, corsHeaders);
      }

      const { sessionToken, expiresAt } = await createPortalSession(
        env,
        accessLink.submission_id,
        accessLink.email_address,
      );

      await env.CONTACT_DB.prepare(
        `UPDATE portal_access_links
        SET consumed_at = ?
        WHERE id = ?`
      )
        .bind(new Date().toISOString(), accessLink.id)
        .run();

      const payloadData = await buildPortalSessionPayload(env, accessLink.email_address);
      return json(
        {
          ok: true,
          sessionToken,
          expiresAt,
          deliveryEmail: maskEmail(accessLink.email_address),
          ...payloadData,
        },
        200,
        corsHeaders,
      );
    }

    if (url.pathname === '/api/portal/session' && request.method === 'GET') {
      if (origin && !isAllowedOrigin(origin, env)) {
        return json({ error: 'Origin not allowed.' }, 403, corsHeaders);
      }

      const session = await resolvePortalSession(env, request);
      if (!session) {
        return json({ error: 'Portal session is invalid or expired.' }, 401, corsHeaders);
      }

      const payloadData = await buildPortalSessionPayload(env, session.email_address);
      return json(
        {
          ok: true,
          expiresAt: session.expires_at,
          ...payloadData,
        },
        200,
        corsHeaders,
      );
    }

    if (url.pathname === '/api/portal/logout' && request.method === 'POST') {
      if (origin && !isAllowedOrigin(origin, env)) {
        return json({ error: 'Origin not allowed.' }, 403, corsHeaders);
      }

      const rawToken = getBearerToken(request);
      if (!rawToken) {
        return json({ ok: true }, 200, corsHeaders);
      }

      const tokenHash = await sha256Hex(rawToken);
      await env.CONTACT_DB.prepare(
        `UPDATE portal_sessions
        SET revoked_at = ?
        WHERE session_token_hash = ?`
      )
        .bind(new Date().toISOString(), tokenHash)
        .run();

      return json({ ok: true }, 200, corsHeaders);
    }

    if (url.pathname !== '/api/contact' || request.method !== 'POST') {
      return json({ error: 'Not found.' }, 404, corsHeaders);
    }

    if (!isAllowedOrigin(origin, env)) {
      return json({ error: 'Origin not allowed.' }, 403, corsHeaders);
    }

    let payload;
    try {
      payload = await request.json();
    } catch {
      return json({ error: 'Invalid JSON body.' }, 400, corsHeaders);
    }

    const errors = validatePayload(payload);
    if (errors.length > 0) {
      return json({ error: errors[0], details: errors }, 400, corsHeaders);
    }

    const submissionId = crypto.randomUUID();
    const createdAt = new Date().toISOString();

    await env.CONTACT_DB.prepare(
      `INSERT INTO contact_submissions (
        id,
        full_name,
        gender,
        birth_day,
        birth_month,
        birth_year,
        birth_hour,
        birth_meridiem,
        birth_minute,
        birth_second,
        country,
        place_of_birth,
        preferred_language,
        discussion_mode,
        phone_number,
        email_address,
        message_text,
        source_page,
        origin,
        user_agent,
        cf_country,
        created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
      .bind(
        submissionId,
        String(payload.fullName || '').trim(),
        String(payload.gender || '').trim(),
        Number(payload.birthDay),
        String(payload.birthMonth || '').trim(),
        Number(payload.birthYear),
        Number(payload.birthHour),
        String(payload.birthMeridiem || '').trim().toUpperCase() ||
          (Number(payload.birthHour) >= 12 ? 'PM' : 'AM'),
        Number(payload.birthMinute),
        Number(payload.birthSecond),
        String(payload.country || '').trim(),
        String(payload.placeOfBirth || '').trim(),
        String(payload.preferredLanguage || '').trim(),
        String(payload.discussionMode || '').trim(),
        String(payload.phoneNumber || '').trim(),
        normalizeEmail(payload.emailAddress),
        String(payload.messageText || '').trim(),
        String(payload.sourcePage || '/contact'),
        origin,
        request.headers.get('User-Agent') || '',
        request.cf?.country || '',
        createdAt,
      )
      .run();

    return json(
      {
        ok: true,
        id: submissionId,
        createdAt,
      },
      201,
      corsHeaders,
    );
  },
};
