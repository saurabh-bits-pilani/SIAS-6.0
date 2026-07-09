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

  if (
    !Number.isInteger(hour) ||
    !Number.isInteger(minute) ||
    !Number.isInteger(second)
  ) {
    return '';
  }

  return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')}`;
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
      body {
        margin: 0;
        font-family: Arial, sans-serif;
        background: linear-gradient(180deg, #f8f3ea 0%, #f3ecdf 100%);
        color: var(--ink);
      }
      .wrap {
        max-width: 1440px;
        margin: 0 auto;
        padding: 32px 20px 48px;
      }
      .hero {
        background: linear-gradient(135deg, rgba(17,24,39,0.98), rgba(39,51,74,0.95));
        color: #f9edd6;
        border-radius: 28px;
        padding: 28px;
        box-shadow: 0 24px 70px rgba(17,24,39,0.18);
      }
      .eyebrow {
        color: #eac36b;
        font-size: 12px;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        font-weight: 700;
      }
      h1 {
        margin: 12px 0 8px;
        font-size: 40px;
        line-height: 1.1;
      }
      .sub {
        color: #e5d7bb;
        max-width: 720px;
        font-size: 16px;
        line-height: 1.7;
      }
      .stats {
        display: flex;
        gap: 16px;
        flex-wrap: wrap;
        margin-top: 20px;
      }
      .stat {
        background: rgba(255,255,255,0.08);
        border: 1px solid rgba(255,255,255,0.12);
        border-radius: 18px;
        padding: 14px 18px;
        min-width: 180px;
      }
      .stat strong {
        display: block;
        color: white;
        font-size: 26px;
      }
      .card {
        margin-top: 24px;
        background: var(--card);
        border: 1px solid var(--line);
        border-radius: 24px;
        overflow: hidden;
        box-shadow: 0 18px 40px rgba(120, 93, 47, 0.08);
      }
      .card-head {
        padding: 18px 22px;
        border-bottom: 1px solid var(--line);
        display: flex;
        justify-content: space-between;
        gap: 12px;
        align-items: center;
        flex-wrap: wrap;
      }
      .card-head h2 {
        margin: 0;
        font-size: 20px;
      }
      .card-head p {
        margin: 0;
        color: var(--muted);
        font-size: 14px;
      }
      .table-wrap {
        overflow: auto;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        min-width: 1100px;
      }
      th, td {
        padding: 14px 16px;
        text-align: left;
        vertical-align: top;
        border-bottom: 1px solid var(--line);
        font-size: 14px;
      }
      th {
        position: sticky;
        top: 0;
        background: #fbf6ed;
        color: #6e5530;
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.08em;
      }
      td a {
        color: #80581f;
        text-decoration: none;
      }
      td a:hover {
        text-decoration: underline;
      }
      .empty {
        padding: 40px 24px;
        color: var(--muted);
      }
      @media (max-width: 768px) {
        h1 { font-size: 30px; }
        .wrap { padding: 18px 12px 36px; }
        .hero { padding: 22px; border-radius: 22px; }
      }
    </style>
  </head>
  <body>
    <div class="wrap">
      <section class="hero">
        <div class="eyebrow">Cloudflare Workers Preview</div>
        <h1>Soul Infinity Leads Table</h1>
        <p class="sub">This preview reads directly from Cloudflare D1 and lists the most recent saved contact submissions, newest first.</p>
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
    'Access-Control-Allow-Methods': 'POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
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

  return errors;
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
          birth_minute,
          birth_second,
          phone_number,
          email_address,
          country,
          place_of_birth,
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
        birth_minute,
        birth_second,
        country,
        place_of_birth,
        phone_number,
        email_address,
        message_text,
        source_page,
        origin,
        user_agent,
        cf_country,
        created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
      .bind(
        submissionId,
        String(payload.fullName || '').trim(),
        String(payload.gender || '').trim(),
        Number(payload.birthDay),
        String(payload.birthMonth || '').trim(),
        Number(payload.birthYear),
        Number(payload.birthHour),
        Number(payload.birthMinute),
        Number(payload.birthSecond),
        String(payload.country || '').trim(),
        String(payload.placeOfBirth || '').trim(),
        String(payload.phoneNumber || '').trim(),
        String(payload.emailAddress || '').trim(),
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
