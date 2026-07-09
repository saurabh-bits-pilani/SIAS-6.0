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

function safeJsonForScript(value) {
  return JSON.stringify(value)
    .replaceAll('<', '\\u003c')
    .replaceAll('>', '\\u003e')
    .replaceAll('&', '\\u0026');
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
  const leadCards = rows
    .map(
      (row) => `
        <article class="lead-card" data-search-primary="${escapeHtml(
          [
            row.full_name,
            row.country,
            row.place_of_birth,
            row.preferred_language,
            row.discussion_mode,
            row.gender,
            row.message_text,
            row.source_page,
          ]
            .filter(Boolean)
            .join(' ')
            .toLowerCase(),
        )}" data-search-contact="${escapeHtml(
          [
            row.full_name,
            row.email_address,
            row.phone_number,
          ]
            .filter(Boolean)
            .join(' ')
            .toLowerCase(),
        )}">
          <div class="lead-top">
            <div>
              <p class="lead-time">${escapeHtml(formatIstTimestamp(row.created_at))}</p>
              <h3>${escapeHtml(row.full_name)}</h3>
            </div>
            <div class="lead-actions">
              <a href="tel:${escapeHtml(row.phone_number)}">Call</a>
              <a href="mailto:${escapeHtml(row.email_address)}">Email</a>
            </div>
          </div>

          <div class="lead-grid">
            <div class="meta">
              <span>Birth date</span>
              <strong>${escapeHtml(formatBirthDate(row))}</strong>
            </div>
            <div class="meta">
              <span>Birth time</span>
              <strong>${escapeHtml(formatBirthTime(row))}</strong>
            </div>
            <div class="meta">
              <span>Phone</span>
              <strong><a href="tel:${escapeHtml(row.phone_number)}">${escapeHtml(row.phone_number)}</a></strong>
            </div>
            <div class="meta">
              <span>Email</span>
              <strong><a href="mailto:${escapeHtml(row.email_address)}">${escapeHtml(row.email_address)}</a></strong>
            </div>
            <div class="meta">
              <span>Country</span>
              <strong>${escapeHtml(row.country || 'Not shared')}</strong>
            </div>
            <div class="meta">
              <span>Place of birth</span>
              <strong>${escapeHtml(row.place_of_birth || 'Not shared')}</strong>
            </div>
            <div class="meta">
              <span>Language</span>
              <strong>${escapeHtml(row.preferred_language || 'Not shared')}</strong>
            </div>
            <div class="meta">
              <span>Discussion mode</span>
              <strong>${escapeHtml(row.discussion_mode || 'Not shared')}</strong>
            </div>
            <div class="meta">
              <span>Gender</span>
              <strong>${escapeHtml(row.gender || 'Not shared')}</strong>
            </div>
            <div class="meta">
              <span>Source</span>
              <strong>${escapeHtml(row.source_page || '/contact')}</strong>
            </div>
          </div>

          <div class="message-box">
            <span>Message</span>
            <p>${escapeHtml(row.message_text || 'No additional message shared.')}</p>
          </div>
        </article>`
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
      .controls { display: grid; gap: 12px; width: 100%; }
      .search-bar { display: flex; flex-wrap: wrap; gap: 12px; align-items: center; }
      .search-input { flex: 1 1 300px; min-width: 0; border: 1px solid #d8cdb8; border-radius: 999px; padding: 12px 16px; background: white; font: inherit; }
      .results-chip { display: inline-flex; align-items: center; justify-content: center; min-height: 46px; padding: 10px 16px; border-radius: 999px; background: #fbf6ed; border: 1px solid #e7dcc7; color: #5f4b28; font-weight: 700; white-space: nowrap; }
      .lead-list { display: grid; gap: 18px; padding: 20px; }
      .lead-card { border: 1px solid var(--line); border-radius: 22px; background: linear-gradient(180deg, #fffefb 0%, #fdf7ec 100%); padding: 20px; box-shadow: 0 14px 30px rgba(120, 93, 47, 0.06); }
      .lead-top { display: flex; justify-content: space-between; gap: 16px; align-items: flex-start; margin-bottom: 16px; }
      .lead-top h3 { margin: 8px 0 0; font-size: 24px; line-height: 1.15; color: #243042; }
      .lead-time { margin: 0; color: #8a6a39; font-size: 12px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; }
      .lead-actions { display: flex; gap: 10px; flex-wrap: wrap; }
      .lead-actions a { display: inline-flex; align-items: center; justify-content: center; padding: 10px 14px; border-radius: 999px; color: #243042; text-decoration: none; border: 1px solid #d7c8ae; background: rgba(255,255,255,0.95); font-weight: 700; }
      .lead-actions a:hover { background: #fbf6ed; }
      .lead-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
      .meta { min-width: 0; padding: 14px 15px; border-radius: 16px; background: #fffdfa; border: 1px solid #eee1c7; }
      .meta span { display: block; color: #8b6f45; font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; }
      .meta strong { display: block; margin-top: 6px; color: #243042; font-size: 15px; line-height: 1.55; overflow-wrap: anywhere; }
      .meta a { color: #80581f; text-decoration: none; }
      .meta a:hover { text-decoration: underline; }
      .message-box { margin-top: 14px; padding: 16px; border-radius: 18px; background: #fffaf1; border: 1px solid #ead8b8; }
      .message-box span { display: block; color: #8b6f45; font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; }
      .message-box p { margin: 8px 0 0; color: #2f3948; line-height: 1.7; white-space: pre-wrap; overflow-wrap: anywhere; }
      .pagination { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px; padding: 0 20px 20px; }
      .pagination-meta { color: var(--muted); font-size: 14px; }
      .pagination-actions { display: flex; gap: 10px; }
      .pager-btn { border: 1px solid #d7c8ae; background: white; color: #243042; border-radius: 999px; padding: 10px 16px; font: inherit; font-weight: 700; cursor: pointer; }
      .pager-btn:disabled { opacity: 0.45; cursor: not-allowed; }
      .empty { padding: 40px 24px; color: var(--muted); }
      @media (max-width: 900px) {
        .lead-grid { grid-template-columns: 1fr; }
        .lead-top { flex-direction: column; }
      }
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
          <div class="controls">
            <div class="search-bar">
              <input id="leadSearch" class="search-input" type="search" placeholder="Search by name, email, phone, country, birth place, message..." />
              <div id="resultsChip" class="results-chip">Showing ${rows.length} records</div>
            </div>
          </div>
        </div>
        <div id="leadList" class="lead-list">
          ${
            rows.length > 0
              ? leadCards
              : `<div class="empty">No records have been saved yet.</div>`
          }
        </div>
        ${
          rows.length > 0
            ? `<div class="pagination">
                <div id="paginationMeta" class="pagination-meta"></div>
                <div class="pagination-actions">
                  <button id="prevPage" class="pager-btn" type="button">Previous</button>
                  <button id="nextPage" class="pager-btn" type="button">Next</button>
                </div>
              </div>`
            : ''
        }
      </section>
    </div>
    ${
      rows.length > 0
        ? `<script>
            const searchInput = document.getElementById('leadSearch');
            const leadCards = Array.from(document.querySelectorAll('.lead-card'));
            const resultsChip = document.getElementById('resultsChip');
            const paginationMeta = document.getElementById('paginationMeta');
            const prevPage = document.getElementById('prevPage');
            const nextPage = document.getElementById('nextPage');
            const pageSize = 10;
            let currentPage = 1;

            function filteredCards() {
              const query = (searchInput.value || '').trim().toLowerCase();
              if (!query) return leadCards;

              const isEmailLike = query.includes('@') || query.includes('.');
              const hasDigits = /[0-9+]/.test(query);
              const datasetKey = isEmailLike || hasDigits ? 'searchContact' : 'searchPrimary';

              return leadCards.filter((card) => (card.dataset[datasetKey] || '').includes(query));
            }

            function renderCards() {
              const matches = filteredCards();
              const totalPages = Math.max(1, Math.ceil(matches.length / pageSize));
              currentPage = Math.min(currentPage, totalPages);
              const start = (currentPage - 1) * pageSize;
              const end = start + pageSize;
              const visible = matches.slice(start, end);

              leadCards.forEach((card) => {
                card.style.display = 'none';
              });

              visible.forEach((card) => {
                card.style.display = 'block';
              });

              resultsChip.textContent = 'Showing ' + matches.length + ' record' + (matches.length === 1 ? '' : 's');

              if (matches.length === 0) {
                paginationMeta.textContent = 'No matching records found.';
              } else {
                paginationMeta.textContent = 'Page ' + currentPage + ' of ' + totalPages + ' • Records ' + (start + 1) + '–' + Math.min(end, matches.length);
              }

              prevPage.disabled = currentPage <= 1;
              nextPage.disabled = currentPage >= totalPages || matches.length === 0;
            }

            searchInput.addEventListener('input', () => {
              currentPage = 1;
              renderCards();
            });

            prevPage.addEventListener('click', () => {
              if (currentPage > 1) {
                currentPage -= 1;
                renderCards();
              }
            });

            nextPage.addEventListener('click', () => {
              const matches = filteredCards();
              const totalPages = Math.max(1, Math.ceil(matches.length / pageSize));
              if (currentPage < totalPages) {
                currentPage += 1;
                renderCards();
              }
            });

            renderCards();
          </script>`
        : ''
    }
  </body>
</html>`;
}

function renderPortalAdminHtml(leads, reports, defaultPortalBase) {
  const leadDataJson = safeJsonForScript(
    leads.map((lead) => ({
      id: lead.id,
      fullName: lead.full_name,
      emailAddress: lead.email_address,
      phoneNumber: lead.phone_number || '',
      createdAt: lead.created_at,
      createdAtLabel: formatIstTimestamp(lead.created_at),
    })),
  );

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
      .picker-meta { margin-top: 8px; color: var(--muted); font-size: 13px; }
      .quick-leads { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px; }
      .quick-lead { border: 1px solid #cfe0f5; background: #f7fbff; color: #174a7a; border-radius: 999px; padding: 8px 12px; font-size: 13px; cursor: pointer; }
      .quick-lead:hover { background: #edf6ff; }
      .helper { margin-top: 8px; color: var(--muted); font-size: 13px; line-height: 1.6; }
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
                <label for="reportLeadSearch">Find Lead</label>
                <input id="reportLeadSearch" type="text" placeholder="Search by name, email, or phone" autocomplete="off" />
                <div class="helper">Recent leads from the last 5 days appear first. Use search for older records.</div>
                <div id="reportQuickLeads" class="quick-leads"></div>
              </div>
              <div class="field">
                <label for="submissionId">Lead</label>
                <select id="submissionId" name="submissionId" required>
                  <option value="">Select a saved lead</option>
                </select>
                <div id="reportLeadMeta" class="picker-meta"></div>
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
                <label for="linkLeadSearch">Find Lead</label>
                <input id="linkLeadSearch" type="text" placeholder="Search by name, email, or phone" autocomplete="off" />
                <div class="helper">Recent leads from the last 5 days appear first. Use search for older records.</div>
                <div id="linkQuickLeads" class="quick-leads"></div>
              </div>
              <div class="field">
                <label for="linkSubmissionId">Lead</label>
                <select id="linkSubmissionId" name="submissionId" required>
                  <option value="">Select a saved lead</option>
                </select>
                <div id="linkLeadMeta" class="picker-meta"></div>
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
      const leads = ${leadDataJson};
      const recentThreshold = Date.now() - 5 * 24 * 60 * 60 * 1000;

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

      function buildLeadLabel(lead) {
        const phone = lead.phoneNumber ? ' | ' + lead.phoneNumber : '';
        return lead.fullName + ' | ' + lead.emailAddress + phone + ' | ' + lead.createdAtLabel;
      }

      function escapeInlineHtml(value) {
        return String(value)
          .replaceAll('&', '&amp;')
          .replaceAll('<', '&lt;')
          .replaceAll('>', '&gt;')
          .replaceAll('"', '&quot;')
          .replaceAll("'", '&#39;');
      }

      function renderLeadMeta(metaId, lead) {
        const metaNode = document.getElementById(metaId);
        if (!metaNode) return;
        if (!lead) {
          metaNode.textContent = '';
          return;
        }
        metaNode.textContent = 'Selected: ' + lead.fullName + ' | ' + lead.emailAddress + (lead.phoneNumber ? ' | ' + lead.phoneNumber : '');
      }

      function createLeadPicker(config) {
        const searchInput = document.getElementById(config.searchId);
        const select = document.getElementById(config.selectId);
        const quickLeads = document.getElementById(config.quickId);
        const metaId = config.metaId;

        function filteredLeads() {
          const query = (searchInput.value || '').trim().toLowerCase();
          const sorted = [...leads].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

          if (!query) {
            return sorted;
          }

          return sorted.filter((lead) =>
            lead.fullName.toLowerCase().includes(query) ||
            lead.emailAddress.toLowerCase().includes(query) ||
            (lead.phoneNumber || '').toLowerCase().includes(query)
          );
        }

        function fillOptions() {
          const currentValue = select.value;
          const matches = filteredLeads();
          select.innerHTML = '<option value=\"\">Select a saved lead</option>' +
            matches.map((lead) => '<option value=\"' + escapeInlineHtml(lead.id) + '\">' + escapeInlineHtml(buildLeadLabel(lead)) + '</option>').join('');

          if (matches.some((lead) => lead.id === currentValue)) {
            select.value = currentValue;
          }

          const activeLead = leads.find((lead) => lead.id === select.value) || null;
          renderLeadMeta(metaId, activeLead);
        }

        function fillQuickLeads() {
          const recentLeads = [...leads]
            .filter((lead) => new Date(lead.createdAt).getTime() >= recentThreshold)
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, 12);

          if (recentLeads.length === 0) {
            quickLeads.innerHTML = '<span class=\"helper\">No leads were created in the last 5 days.</span>';
            return;
          }

          quickLeads.innerHTML = recentLeads
            .map((lead) => '<button type=\"button\" class=\"quick-lead\" data-lead-id=\"' + escapeInlineHtml(lead.id) + '\">' + escapeInlineHtml(lead.fullName) + '</button>')
            .join('');

          quickLeads.querySelectorAll('[data-lead-id]').forEach((button) => {
            button.addEventListener('click', () => {
              searchInput.value = '';
              fillOptions();
              select.value = button.getAttribute('data-lead-id') || '';
              const activeLead = leads.find((lead) => lead.id === select.value) || null;
              renderLeadMeta(metaId, activeLead);
            });
          });
        }

        searchInput.addEventListener('input', fillOptions);
        select.addEventListener('change', () => {
          const activeLead = leads.find((lead) => lead.id === select.value) || null;
          renderLeadMeta(metaId, activeLead);
        });

        fillQuickLeads();
        fillOptions();
      }

      createLeadPicker({
        searchId: 'reportLeadSearch',
        selectId: 'submissionId',
        quickId: 'reportQuickLeads',
        metaId: 'reportLeadMeta',
      });

      createLeadPicker({
        searchId: 'linkLeadSearch',
        selectId: 'linkSubmissionId',
        quickId: 'linkQuickLeads',
        metaId: 'linkLeadMeta',
      });

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
            phone_number,
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
