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
