import fontkit from '@pdf-lib/fontkit';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

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
const REPORT_LOGO_URL = 'https://pub-5d1db6c95ad0491c90e15290c1e62703.r2.dev/Logo/Soul%20-Infinity-logo%201.png';
const REPORT_SCRIPT_FONT_URL = 'https://raw.githubusercontent.com/google/fonts/main/ofl/marckscript/MarckScript-Regular.ttf';
const REPORT_SITE_URL = 'https://www.soulinfinity.space';
const REPORT_PROFILE_STAMP_URL = `${REPORT_SITE_URL}/saurabh-jain-pdf-stamp.png`;
const REPORT_CONTACT_EMAIL = 'soul.infinity.astro@gmail.com';
const REPORT_CONTACT_PHONE = '+91 90790 53840';
const REPORT_CONTACT_WHATSAPP = 'https://wa.me/919079053840';
const textEncoder = new TextEncoder();
let reportLogoAssetPromise;
let reportScriptFontPromise;
let reportProfileStampPromise;

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

function normalizeBlockText(value) {
  return String(value || '').replaceAll('\r\n', '\n').trim();
}

function normalizeWhitespace(value) {
  return normalizeBlockText(value).replace(/\n{3,}/g, '\n\n');
}

function combineReportSections({ analysisBody, remediesBody, resourceLinksBody }) {
  const sections = [
    ['Planetary Analysis', normalizeWhitespace(analysisBody)],
    ['Recommended Remedies', normalizeWhitespace(remediesBody)],
    ['Mantras And Helpful Links', normalizeWhitespace(resourceLinksBody)],
  ].filter(([, body]) => body);

  return sections
    .map(([title, body]) => `${title}\n${body}`)
    .join('\n\n');
}

function sanitizePdfText(value) {
  return String(value || '')
    .replaceAll('\r\n', '\n')
    .replaceAll('🕉', 'Om')
    .replaceAll('ॐ', 'Om')
    .replaceAll('•', '-')
    .replaceAll('–', '-')
    .replaceAll('—', '-')
    .replaceAll('’', "'")
    .replaceAll('‘', "'")
    .replaceAll('“', '"')
    .replaceAll('”', '"')
    .replaceAll('…', '...')
    .replaceAll('→', '->')
    .replaceAll('₹', 'Rs.')
    .replace(/[^\x09\x0A\x0D\x20-\x7E\xA0-\xFF]/g, '');
}

function wrapTextToWidth(text, font, size, maxWidth) {
  const normalized = sanitizePdfText(text).trim();
  if (!normalized) {
    return [''];
  }

  const tokens = normalized.split(/\s+/);
  const lines = [];
  let currentLine = '';

  const pushLine = () => {
    if (currentLine) {
      lines.push(currentLine);
      currentLine = '';
    }
  };

  for (const token of tokens) {
    const candidate = currentLine ? `${currentLine} ${token}` : token;
    if (font.widthOfTextAtSize(candidate, size) <= maxWidth) {
      currentLine = candidate;
      continue;
    }

    if (currentLine) {
      pushLine();
    }

    if (font.widthOfTextAtSize(token, size) <= maxWidth) {
      currentLine = token;
      continue;
    }

    let fragment = '';
    for (const char of token) {
      const fragmentCandidate = fragment + char;
      if (font.widthOfTextAtSize(fragmentCandidate, size) <= maxWidth) {
        fragment = fragmentCandidate;
      } else {
        if (fragment) {
          lines.push(fragment);
        }
        fragment = char;
      }
    }

    currentLine = fragment;
  }

  pushLine();
  return lines.length > 0 ? lines : [''];
}

async function fetchBinaryAsset(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      return null;
    }
    return {
      bytes: new Uint8Array(await response.arrayBuffer()),
      contentType: response.headers.get('content-type') || '',
    };
  } catch {
    return null;
  }
}

function asEmbeddedImageAsset(asset) {
  if (!asset || !asset.contentType) {
    return null;
  }

  const contentType = String(asset.contentType).toLowerCase();
  if (contentType.includes('png')) {
    return {
      bytes: asset.bytes,
      isPng: true,
    };
  }

  if (contentType.includes('jpeg') || contentType.includes('jpg')) {
    return {
      bytes: asset.bytes,
      isPng: false,
    };
  }

  return null;
}

async function fetchReportLogoBytes() {
  if (!reportLogoAssetPromise) {
    reportLogoAssetPromise = fetchBinaryAsset(REPORT_LOGO_URL).then(asEmbeddedImageAsset);
  }

  return reportLogoAssetPromise;
}

async function fetchReportScriptFontBytes() {
  if (!reportScriptFontPromise) {
    reportScriptFontPromise = fetchBinaryAsset(REPORT_SCRIPT_FONT_URL).then((asset) => asset?.bytes || null);
  }

  return reportScriptFontPromise;
}

async function fetchReportProfileStampBytes() {
  if (!reportProfileStampPromise) {
    reportProfileStampPromise = fetchBinaryAsset(REPORT_PROFILE_STAMP_URL).then(asEmbeddedImageAsset);
  }

  return reportProfileStampPromise;
}

function extractResourceEntries(value) {
  return normalizeBlockText(value)
    .split('\n')
    .map((line) => line.trim())
    .map((line) => line.replace(/^[-*•]\s*/, ''))
    .filter(Boolean);
}

function isEmojiOrSymbolBullet(line) {
  return /^[^\p{L}\p{N}\s][^\s]*\s+/u.test(line);
}

function shouldTreatAsLineList(lines) {
  if (lines.length < 2) {
    return false;
  }

  if (lines.some((line) => line.length > 240 || line.endsWith(':'))) {
    return false;
  }

  return lines.every((line) => /[A-Za-z0-9\u00C0-\u024F\u0900-\u097F]/u.test(line));
}

function parseRichTextBlocks(value) {
  const rawBlocks = String(value || '')
    .replaceAll('\r\n', '\n')
    .split(/\n\s*\n/g)
    .map((block) => block.trim())
    .filter(Boolean);

  return rawBlocks.flatMap((rawBlock) => {
    const lines = rawBlock
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);

    if (lines.length === 0) {
      return [];
    }

    const orderedItems = lines
      .map((line) => line.match(/^(\d+)[.)]\s+(.*)$/))
      .filter(Boolean);
    if (orderedItems.length === lines.length) {
      return [{ type: 'ordered-list', items: orderedItems.map((match) => match[2].trim()) }];
    }

    const explicitUnorderedItems = lines
      .map((line) => line.match(/^[-*•]\s+(.*)$/))
      .filter(Boolean);
    if (explicitUnorderedItems.length === lines.length) {
      return [{ type: 'unordered-list', items: explicitUnorderedItems.map((match) => match[1].trim()) }];
    }

    if (lines.every((line) => isEmojiOrSymbolBullet(line))) {
      return [{ type: 'unordered-list', items: lines }];
    }

    if (shouldTreatAsLineList(lines)) {
      return [{ type: 'unordered-list', items: lines }];
    }

    return [{ type: 'paragraph', text: lines.join(' ') }];
  });
}

async function createReportPdf(report, submission) {
  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit);
  const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const scriptFontBytes = await fetchReportScriptFontBytes();
  const scriptFont = scriptFontBytes ? await pdfDoc.embedFont(scriptFontBytes).catch(() => null) : null;
  const logoAsset = await fetchReportLogoBytes();
  const profileStampAsset = await fetchReportProfileStampBytes();
  const embeddedLogo = logoAsset
    ? await (logoAsset.isPng ? pdfDoc.embedPng(logoAsset.bytes) : pdfDoc.embedJpg(logoAsset.bytes)).catch(() => null)
    : null;
  const embeddedProfileStamp = profileStampAsset
    ? await (profileStampAsset.isPng ? pdfDoc.embedPng(profileStampAsset.bytes) : pdfDoc.embedJpg(profileStampAsset.bytes)).catch(() => null)
    : null;

  const pageWidth = 595.28;
  const pageHeight = 841.89;
  const marginX = 48;
  const topMargin = 52;
  const bottomMargin = 78;
  const contentWidth = pageWidth - marginX * 2;
  const normalTextSize = 11;
  const lineGap = 5;
  const palette = {
    paper: rgb(0.995, 0.984, 0.957),
    navy: rgb(0.08, 0.118, 0.188),
    navySoft: rgb(0.17, 0.22, 0.31),
    gold: rgb(0.79, 0.61, 0.24),
    goldSoft: rgb(0.96, 0.93, 0.84),
    sage: rgb(0.79, 0.88, 0.83),
    blush: rgb(0.98, 0.94, 0.92),
    ink: rgb(0.16, 0.19, 0.25),
    muted: rgb(0.37, 0.42, 0.5),
    line: rgb(0.88, 0.83, 0.74),
    link: rgb(0.14, 0.42, 0.68),
  };
  const sectionAccent = {
    'Planetary Analysis': rgb(0.92, 0.84, 0.63),
    'Recommended Remedies': rgb(0.78, 0.88, 0.81),
    'Mantras And Helpful Links': rgb(0.84, 0.9, 0.95),
  };

  let page;
  let cursorY;
  let pageNumber = 0;
  let sectionIndex = 0;

  const bodyFont = regularFont;
  const titleFont = boldFont;
  const accentFont = scriptFont || boldFont;
  const drawTextSafe = (text, options) => {
    page.drawText(sanitizePdfText(text), options);
  };

  const drawWrappedParagraph = (text, options = {}) => {
    const {
      x = marginX,
      width = contentWidth,
      font = bodyFont,
      size = normalTextSize,
      color = palette.ink,
      lineHeight = size + lineGap,
      gapAfter = 0,
    } = options;

    const lines = wrapTextToWidth(text.replaceAll('\n', ' '), font, size, width);
    for (const line of lines) {
      ensureSpace(lineHeight + 2);
      drawTextSafe(line, {
        x,
        y: cursorY,
        font,
        size,
        color,
      });
      cursorY -= lineHeight;
    }

    cursorY -= gapAfter;
  };

  const drawParagraphCard = (text, options = {}) => {
    const {
      outerX = marginX,
      innerX = marginX + 16,
      width = contentWidth,
      font = bodyFont,
      size = normalTextSize,
      color = palette.ink,
      lineHeight = size + lineGap,
      fillColor = rgb(1, 1, 1),
      borderColor = palette.line,
      paddingTop = 14,
      paddingBottom = 14,
      gapAfter = 10,
    } = options;

    const availableWidth = Math.max(40, width - (innerX - outerX) * 2);
    const lines = wrapTextToWidth(text.replaceAll('\n', ' '), font, size, availableWidth);
    const boxHeight = paddingTop + paddingBottom + lines.length * lineHeight;

    ensureSpace(boxHeight + 10);
    page.drawRectangle({
      x: outerX,
      y: cursorY - boxHeight + paddingTop,
      width,
      height: boxHeight,
      color: fillColor,
      borderColor,
      borderWidth: 1,
    });

    lines.forEach((line) => {
      drawTextSafe(line, {
        x: innerX,
        y: cursorY,
        font,
        size,
        color,
      });
      cursorY -= lineHeight;
    });

    cursorY -= paddingBottom + gapAfter;
  };

  const drawPageChrome = () => {
    page.drawRectangle({
      x: 0,
      y: 0,
      width: pageWidth,
      height: pageHeight,
      color: palette.paper,
    });
    page.drawRectangle({
      x: 0,
      y: pageHeight - 166,
      width: pageWidth,
      height: 166,
      color: palette.navy,
    });
    page.drawRectangle({
      x: 0,
      y: pageHeight - 174,
      width: pageWidth,
      height: 8,
      color: palette.gold,
    });
    page.drawRectangle({
      x: 0,
      y: 0,
      width: pageWidth,
      height: 52,
      color: rgb(0.985, 0.972, 0.94),
    });
    page.drawLine({
      start: { x: marginX, y: 56 },
      end: { x: pageWidth - marginX, y: 56 },
      thickness: 1,
      color: palette.line,
    });
    page.drawEllipse({
      x: pageWidth - 76,
      y: pageHeight - 80,
      xScale: 56,
      yScale: 56,
      color: rgb(1, 1, 1),
      opacity: 0.08,
    });
    page.drawEllipse({
      x: pageWidth - 104,
      y: pageHeight - 80,
      xScale: 28,
      yScale: 28,
      color: rgb(1, 1, 1),
      opacity: 0.08,
    });
    page.drawEllipse({
      x: 74,
      y: 26,
      xScale: 20,
      yScale: 20,
      color: palette.sage,
      opacity: 0.35,
    });

    if (embeddedLogo) {
      const logoDims = embeddedLogo.scale(0.23);
      page.drawImage(embeddedLogo, {
        x: marginX,
        y: pageHeight - 118,
        width: logoDims.width,
        height: logoDims.height,
      });
    }

    drawTextSafe('Soul Infinity', {
      x: marginX + 78,
      y: pageHeight - 76,
      font: titleFont,
      size: 22,
      color: rgb(1, 0.973, 0.91),
    });
    drawTextSafe('Vedic Astrology And Spiritual Guidance', {
      x: marginX + 78,
      y: pageHeight - 98,
      font: bodyFont,
      size: 10,
      color: rgb(0.95, 0.92, 0.85),
    });
    drawTextSafe('Sacred guidance report', {
      x: marginX + 78,
      y: pageHeight - 122,
      font: accentFont,
      size: scriptFont ? 18 : 11,
      color: rgb(0.95, 0.83, 0.56),
    });
    drawTextSafe(REPORT_CONTACT_EMAIL, {
      x: pageWidth - marginX - 180,
      y: pageHeight - 76,
      font: bodyFont,
      size: 9,
      color: rgb(0.95, 0.92, 0.85),
    });
    drawTextSafe(REPORT_CONTACT_PHONE, {
      x: pageWidth - marginX - 180,
      y: pageHeight - 94,
      font: bodyFont,
      size: 9,
      color: rgb(0.95, 0.92, 0.85),
    });
    drawTextSafe(REPORT_SITE_URL, {
      x: pageWidth - marginX - 180,
      y: pageHeight - 112,
      font: bodyFont,
      size: 9,
      color: rgb(0.6, 0.86, 0.98),
    });

    if (pageNumber === 1 && embeddedProfileStamp) {
      const stampSize = 58;
      const stampX = pageWidth - marginX - 72;
      const stampY = pageHeight - 134;
      page.drawEllipse({
        x: stampX + stampSize / 2,
        y: stampY + stampSize / 2,
        xScale: stampSize / 2 + 5,
        yScale: stampSize / 2 + 5,
        color: rgb(1, 1, 1),
        opacity: 0.98,
        borderColor: palette.gold,
        borderWidth: 2,
      });
      page.drawImage(embeddedProfileStamp, {
        x: stampX,
        y: stampY,
        width: stampSize,
        height: stampSize,
      });
      drawTextSafe('Saurabh Jain', {
        x: pageWidth - marginX - 112,
        y: stampY - 14,
        font: boldFont,
        size: 8.5,
        color: rgb(0.95, 0.92, 0.85),
      });
    }

    drawTextSafe('Prepared with care for your spiritual journey', {
      x: marginX,
      y: 34,
      font: accentFont,
      size: scriptFont ? 15 : 9,
      color: palette.gold,
    });
    drawTextSafe(`Website: ${REPORT_SITE_URL} | Email: ${REPORT_CONTACT_EMAIL}`, {
      x: marginX,
      y: 20,
      font: bodyFont,
      size: 8.5,
      color: palette.muted,
    });
    drawTextSafe(`${REPORT_CONTACT_PHONE} | WhatsApp: ${REPORT_CONTACT_WHATSAPP}`, {
      x: marginX,
      y: 8,
      font: bodyFont,
      size: 8.5,
      color: palette.muted,
    });
    drawTextSafe(`Page ${pageNumber}`, {
      x: pageWidth - marginX - 34,
      y: 20,
      font: boldFont,
      size: 9,
      color: palette.navySoft,
    });
  };

  const createPage = () => {
    pageNumber += 1;
    page = pdfDoc.addPage([pageWidth, pageHeight]);
    drawPageChrome();
    cursorY = pageHeight - topMargin - 144;
  };

  const ensureSpace = (requiredHeight) => {
    if (!page || cursorY - requiredHeight < bottomMargin) {
      createPage();
    }
  };

  const drawLines = (lines, options = {}) => {
    const {
      x = marginX,
      font = bodyFont,
      size = normalTextSize,
      color = palette.ink,
      lineHeight = size + lineGap,
      indent = 0,
    } = options;

    for (const line of lines) {
      ensureSpace(lineHeight + 4);
      drawTextSafe(line, {
        x: x + indent,
        y: cursorY,
        font,
        size,
        color,
      });
      cursorY -= lineHeight;
    }
  };

  const drawParagraphBlock = (body, options = {}) => {
    const paragraphs = normalizeWhitespace(body).split('\n\n').filter(Boolean);
    paragraphs.forEach((paragraph, index) => {
      if (options.boxed) {
        drawParagraphCard(paragraph, options);
      } else {
        const lines = wrapTextToWidth(paragraph.replaceAll('\n', ' '), bodyFont, normalTextSize, (options.width || contentWidth) - 12);
        drawLines(lines, options);
        if (index < paragraphs.length - 1) {
          cursorY -= 6;
        }
      }
    });
  };

  const drawListCard = (items, options = {}) => {
    if (!items.length) {
      return;
    }

    const {
      ordered = false,
      outerX = marginX,
      innerX = marginX + 16,
      width = contentWidth,
      font = bodyFont,
      size = normalTextSize,
      color = palette.ink,
      lineHeight = size + lineGap,
      fillColor = rgb(1, 1, 1),
      borderColor = palette.line,
      paddingTop = 16,
      paddingBottom = 14,
      gapAfter = 10,
    } = options;

    const markerGap = ordered ? 28 : 20;
    const availableWidth = Math.max(40, width - (innerX - outerX) * 2 - markerGap);
    const wrappedItems = items.map((item, index) => {
      const marker = ordered ? `${index + 1}.` : '-';
      return {
        marker,
        lines: wrapTextToWidth(item, font, size, availableWidth),
      };
    });

    const contentHeight = wrappedItems.reduce(
      (total, entry) => total + entry.lines.length * lineHeight + 6,
      0,
    );
    const boxHeight = paddingTop + paddingBottom + Math.max(0, contentHeight - 6);

    ensureSpace(boxHeight + 10);
    page.drawRectangle({
      x: outerX,
      y: cursorY - boxHeight + paddingTop,
      width,
      height: boxHeight,
      color: fillColor,
      borderColor,
      borderWidth: 1,
    });

    let textY = cursorY - paddingTop;
    wrappedItems.forEach((entry) => {
      drawTextSafe(entry.marker, {
        x: innerX,
        y: textY,
        font: boldFont,
        size,
        color: ordered ? palette.navySoft : palette.gold,
      });

      entry.lines.forEach((line, lineIndex) => {
        drawTextSafe(line, {
          x: innerX + markerGap,
          y: textY - lineIndex * lineHeight,
          font,
          size,
          color,
        });
      });

      textY -= entry.lines.length * lineHeight + 6;
    });

    cursorY -= boxHeight + gapAfter;
  };

  const drawFormattedSectionBody = (body, options = {}) => {
    const blocks = parseRichTextBlocks(body);
    blocks.forEach((block) => {
      if (block.type === 'paragraph') {
        drawParagraphBlock(block.text, options);
        return;
      }

      drawListCard(block.items, {
        ...options,
        ordered: block.type === 'ordered-list',
      });
    });
  };

  const drawSectionHeading = (title) => {
    sectionIndex += 1;
    ensureSpace(58);
    const accent = sectionAccent[title] || palette.goldSoft;
    page.drawRectangle({
      x: marginX,
      y: cursorY - 18,
      width: contentWidth,
      height: 40,
      color: rgb(1, 1, 1),
      borderColor: palette.line,
      borderWidth: 1,
    });
    page.drawRectangle({
      x: marginX,
      y: cursorY - 18,
      width: 58,
      height: 40,
      color: accent,
    });
    drawTextSafe(String(sectionIndex).padStart(2, '0'), {
      x: marginX + 18,
      y: cursorY - 2,
      font: titleFont,
      size: 13,
      color: palette.navy,
    });
    drawTextSafe(title, {
      x: marginX + 74,
      y: cursorY - 2,
      font: titleFont,
      size: 14,
      color: palette.navySoft,
    });
    drawTextSafe('Guidance section', {
      x: pageWidth - marginX - 94,
      y: cursorY + 1,
      font: accentFont,
      size: scriptFont ? 11.5 : 8.5,
      color: palette.gold,
    });
    cursorY -= 54;
  };

  const drawPanelStart = (height = 18) => {
    ensureSpace(height + 22);
    page.drawRectangle({
      x: marginX,
      y: cursorY - height + 8,
      width: contentWidth,
      height,
      color: rgb(1, 1, 1),
      borderColor: palette.line,
      borderWidth: 1,
      opacity: 0.88,
    });
  };

  const drawSummaryGrid = (rows) => {
    const cardGap = 12;
    const cardWidth = (contentWidth - cardGap) / 2;
    const cardHeight = 52;

    for (let index = 0; index < rows.length; index += 2) {
      ensureSpace(cardHeight + 14);
      const rowItems = rows.slice(index, index + 2);
      rowItems.forEach((item, itemIndex) => {
        const cardX = marginX + itemIndex * (cardWidth + cardGap);
        page.drawRectangle({
          x: cardX,
          y: cursorY - cardHeight + 8,
          width: cardWidth,
          height: cardHeight,
          color: rgb(1, 1, 1),
          borderColor: palette.line,
          borderWidth: 1,
        });
        drawTextSafe(item.label.toUpperCase(), {
          x: cardX + 14,
          y: cursorY - 10,
          font: boldFont,
          size: 8.5,
          color: palette.gold,
        });
        const lines = wrapTextToWidth(item.value, bodyFont, 10.5, cardWidth - 28).slice(0, 2);
        lines.forEach((line, lineIndex) => {
          drawTextSafe(line, {
            x: cardX + 14,
            y: cursorY - 26 - lineIndex * 12,
            font: bodyFont,
            size: 10.5,
            color: palette.ink,
          });
        });
      });
      cursorY -= cardHeight + 12;
    }
  };

  createPage();
  drawTextSafe('CONFIDENTIAL CLIENT REPORT', {
    x: marginX,
    y: cursorY,
    font: boldFont,
    size: 9.5,
    color: palette.gold,
  });
  cursorY -= 24;

  const titleLines = wrapTextToWidth(report.title || 'Kundali Analysis', titleFont, 24, contentWidth - 18);
  titleLines.forEach((line) => {
    drawTextSafe(line, {
      x: marginX,
      y: cursorY,
      font: titleFont,
      size: 24,
      color: palette.navy,
    });
    cursorY -= 28;
  });

  drawTextSafe(`Prepared for ${submission.full_name || report.fullName || 'Soul Infinity Client'}`, {
    x: marginX,
    y: cursorY,
    font: accentFont,
    size: scriptFont ? 18 : 11,
    color: palette.gold,
  });
  cursorY -= 28;

  page.drawRectangle({
    x: marginX,
    y: cursorY - 48,
    width: contentWidth,
    height: 56,
    color: palette.blush,
    borderColor: rgb(0.95, 0.81, 0.78),
    borderWidth: 1,
  });
  wrapTextToWidth(
    'This document brings together your planetary reading, spiritual remedies, and curated mantra or blog guidance in one beautifully organized report.',
    bodyFont,
    10.5,
    contentWidth - 32,
  ).forEach((line, index) => {
    drawTextSafe(line, {
      x: marginX + 16,
      y: cursorY - 14 - index * 14,
      font: bodyFont,
      size: 10.5,
      color: palette.navySoft,
    });
  });
  cursorY -= 74;

  drawSummaryGrid([
    { label: 'Client', value: submission.full_name || report.fullName || 'Soul Infinity Client' },
    { label: 'Report type', value: report.report_type || 'Kundali Analysis' },
    { label: 'Email', value: submission.email_address || 'Not shared' },
    { label: 'Phone', value: submission.phone_number || 'Not shared' },
    {
      label: 'Birth details',
      value: `${formatBirthDate(submission) || 'Not shared'}${formatBirthTime(submission) ? ` | ${formatBirthTime(submission)}` : ''}`,
    },
    {
      label: 'Birth place',
      value: `${submission.place_of_birth || 'Not shared'}${submission.country ? `, ${submission.country}` : ''}`,
    },
    { label: 'Prepared on', value: formatIstTimestamp(report.updated_at || report.created_at) || 'Not available' },
    { label: 'Guidance by', value: 'Soul Infinity Vedic Astrology Team' },
  ]);
  cursorY -= 6;

  const sections = [
    ['Planetary Analysis', report.analysis_body || report.report_body],
    ['Recommended Remedies', report.remedies_body],
    ['Mantras And Helpful Links', report.resource_links_body],
  ];

  for (const [title, body] of sections) {
    if (!normalizeBlockText(body)) {
      continue;
    }

    drawSectionHeading(title);
    drawPanelStart(18);
    cursorY -= 8;

    if (title === 'Mantras And Helpful Links') {
      const entries = extractResourceEntries(body);
      entries.forEach((entry) => {
        const wrapped = wrapTextToWidth(entry, bodyFont, normalTextSize, contentWidth - 70);
        const entryHeight = Math.max(26, wrapped.length * 18 + 14);
        ensureSpace(entryHeight + 8);
        page.drawRectangle({
          x: marginX,
          y: cursorY - entryHeight + 10,
          width: contentWidth,
          height: entryHeight,
          color: rgb(1, 1, 1),
          borderColor: palette.line,
          borderWidth: 1,
        });
        page.drawRectangle({
          x: marginX + 12,
          y: cursorY - 7,
          width: 10,
          height: 10,
          color: palette.gold,
        });
        drawLines(wrapped, {
          x: marginX + 30,
          size: normalTextSize,
          color: entry.includes('http') ? palette.link : palette.ink,
          lineHeight: 18,
        });
        cursorY -= 10;
      });
    } else {
      drawFormattedSectionBody(body, {
        boxed: true,
        outerX: marginX,
        innerX: marginX + 16,
        width: contentWidth,
        size: normalTextSize,
        color: palette.ink,
        lineHeight: 18,
        gapAfter: 10,
      });
    }

    cursorY -= 14;
  }

  ensureSpace(112);
  page.drawRectangle({
    x: marginX,
    y: cursorY - 72,
    width: contentWidth,
    height: 84,
    color: rgb(1, 1, 1),
    borderColor: palette.line,
    borderWidth: 1,
  });
  wrapTextToWidth(
    'May this guidance support clarity, balance, and confident next steps.',
    accentFont,
    scriptFont ? 17 : 10,
    contentWidth - 36,
  ).forEach((line, index) => {
    drawTextSafe(line, {
      x: marginX + 18,
      y: cursorY - 8 - index * (scriptFont ? 18 : 12),
      font: accentFont,
      size: scriptFont ? 17 : 10,
      color: palette.gold,
    });
  });
  wrapTextToWidth(
    'For follow-up consultation, remedies clarification, or future reports, reconnect through Soul Infinity.',
    bodyFont,
    10,
    contentWidth - 36,
  ).forEach((line, index) => {
    drawTextSafe(line, {
      x: marginX + 18,
      y: cursorY - 32 - index * 12,
      font: bodyFont,
      size: 10,
      color: palette.muted,
    });
  });

  pdfDoc.setTitle(report.title || 'Soul Infinity Analysis Report');
  pdfDoc.setAuthor('Soul Infinity');
  pdfDoc.setSubject(report.report_type || 'Kundali Analysis');
  pdfDoc.setKeywords(['Soul Infinity', 'Astrology Report', 'Kundali Analysis']);
  pdfDoc.setProducer('Soul Infinity Cloudflare Worker');
  pdfDoc.setCreator('Soul Infinity Portal');

  return await pdfDoc.save();
}

function defaultPortalSiteUrl(env, requestUrl = '') {
  const configured = String(env.PORTAL_SITE_URL || '').trim();
  if (configured) {
    return configured;
  }

  try {
    const currentUrl = requestUrl ? new URL(requestUrl) : null;
    const hostname = currentUrl?.hostname || '';
    if (hostname.includes('contact-intake-staging')) {
      return 'https://soul-infinitycom-git-staging-saurabh-bits-pilanis-projects.vercel.app';
    }
  } catch {
    // Fall through to production default.
  }

  return 'https://www.soulinfinity.space';
}

function buildPortalBaseUrl(candidate, env, requestUrl = '') {
  const raw = String(candidate || defaultPortalSiteUrl(env, requestUrl)).trim();

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

  const consultationType = String(data.consultationType || '').trim();
  if (consultationType && !['Free consultation', 'Paid consultation'].includes(consultationType)) {
    errors.push('Consultation type is required.');
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
      consultation_type,
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
    consultationType: result.consultation_type,
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
      ar.analysis_body,
      ar.remedies_body,
      ar.resource_links_body,
      ar.pdf_enabled,
      ar.pdf_generated_at,
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
    analysisBody: row.analysis_body || row.report_body || '',
    remediesBody: row.remedies_body || '',
    resourceLinksBody: row.resource_links_body || '',
    pdfEnabled: Boolean(row.pdf_enabled),
    pdfGeneratedAt: row.pdf_generated_at || '',
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

async function loadReportForSession(env, email, reportId) {
  return await env.CONTACT_DB.prepare(
    `SELECT
      ar.id,
      ar.submission_id,
      ar.title,
      ar.report_type,
      ar.report_body,
      ar.analysis_body,
      ar.remedies_body,
      ar.resource_links_body,
      ar.admin_notes,
      ar.pdf_enabled,
      ar.pdf_generated_at,
      ar.visible_to_client,
      ar.created_at,
      ar.updated_at,
      ar.published_at,
      cs.id AS contact_id,
      cs.full_name,
      cs.gender,
      cs.birth_day,
      cs.birth_month,
      cs.birth_year,
      cs.birth_hour,
      cs.birth_meridiem,
      cs.birth_minute,
      cs.birth_second,
      cs.phone_number,
      cs.email_address,
      cs.country,
      cs.place_of_birth,
      cs.preferred_language,
      cs.discussion_mode
    FROM analysis_reports ar
    INNER JOIN contact_submissions cs
      ON cs.id = ar.submission_id
    WHERE ar.id = ?
      AND cs.email_address = ?
      AND ar.visible_to_client = 1
    LIMIT 1`
  )
    .bind(reportId, email)
    .first();
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
            row.consultation_type,
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
              <span>Consultation type</span>
              <strong>${escapeHtml(row.consultation_type || 'Not shared')}</strong>
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
  const reportSummaryByEmail = {};

  reports.forEach((report) => {
    const emailKey = normalizeEmail(report.email_address);
    if (!emailKey) {
      return;
    }

    if (!reportSummaryByEmail[emailKey]) {
      reportSummaryByEmail[emailKey] = {
        totalReports: 0,
        visibleReports: 0,
        pdfReports: 0,
        latestVisibleTitle: '',
      };
    }

    const summary = reportSummaryByEmail[emailKey];
    summary.totalReports += 1;
    if (report.visible_to_client) {
      summary.visibleReports += 1;
      if (!summary.latestVisibleTitle) {
        summary.latestVisibleTitle = report.title || '';
      }
    }
    if (report.pdf_enabled) {
      summary.pdfReports += 1;
    }
  });

  const leadDataJson = safeJsonForScript(
    leads.map((lead) => ({
      id: lead.id,
      fullName: lead.full_name,
      emailAddress: lead.email_address,
      phoneNumber: lead.phone_number || '',
      createdAt: lead.created_at,
      createdAtLabel: formatIstTimestamp(lead.created_at),
      reportSummary: reportSummaryByEmail[normalizeEmail(lead.email_address)] || {
        totalReports: 0,
        visibleReports: 0,
        pdfReports: 0,
        latestVisibleTitle: '',
      },
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
        <td>${report.pdf_enabled ? 'Enabled' : 'Off'}</td>
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
      .section-card { margin-bottom: 16px; border: 1px solid #eadfcf; border-radius: 18px; padding: 16px; background: linear-gradient(180deg, #fffefb 0%, #fcf8f0 100%); }
      .section-card h3 { margin: 0 0 8px; font-size: 16px; color: #233042; }
      .section-card p { margin: 0 0 12px; color: var(--muted); font-size: 13px; line-height: 1.6; }
      label { display: block; margin-bottom: 6px; font-size: 13px; color: #5b4b32; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; }
      input, select, textarea { width: 100%; padding: 12px 14px; border-radius: 14px; border: 1px solid #d5c7ae; background: white; font: inherit; }
      textarea { min-height: 180px; resize: vertical; }
      .field { margin-bottom: 16px; }
      .row { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
      button { border: 0; border-radius: 999px; background: var(--navy); color: white; padding: 12px 18px; font-weight: 700; cursor: pointer; }
      button.secondary { background: #f0e5d0; color: #5b4b32; border: 1px solid #d5c7ae; }
      .button-row { display: flex; gap: 12px; flex-wrap: wrap; align-items: center; }
      .status { margin-top: 14px; padding: 14px 16px; border-radius: 16px; display: none; }
      .status.show { display: block; }
      .status.success { background: #ecfdf5; color: var(--green); border: 1px solid #a7f3d0; }
      .status.error { background: #fef2f2; color: var(--red); border: 1px solid #fecaca; }
      .status code { display: block; white-space: pre-wrap; overflow-wrap: anywhere; margin-top: 8px; }
      .status p { margin: 8px 0 0; color: inherit; font-size: 13px; line-height: 1.6; }
      .picker-meta { margin-top: 8px; color: var(--muted); font-size: 13px; }
      .picker-meta strong { color: #174a7a; }
      .readiness-note { margin-top: 10px; padding: 12px 14px; border-radius: 14px; font-size: 13px; line-height: 1.6; border: 1px solid #d5c7ae; }
      .readiness-note.ready { background: #ecfdf5; color: #065f46; border-color: #a7f3d0; }
      .readiness-note.warning { background: #fff7ed; color: #9a3412; border-color: #fdba74; }
      .quick-leads { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px; }
      .quick-lead { border: 1px solid #cfe0f5; background: #f7fbff; color: #174a7a; border-radius: 999px; padding: 8px 12px; font-size: 13px; cursor: pointer; }
      .quick-lead:hover { background: #edf6ff; }
      .helper { margin-top: 8px; color: var(--muted); font-size: 13px; line-height: 1.6; }
      .helper-inline { margin-top: 10px; color: #6b7280; font-size: 13px; line-height: 1.6; }
      .save-badge { display: none; margin-top: 12px; padding: 10px 14px; border-radius: 14px; background: #eff6ff; border: 1px solid #bfdbfe; color: #174a7a; font-size: 13px; line-height: 1.6; }
      .save-badge.show { display: block; }
      .save-badge strong { display: block; margin-bottom: 4px; }
      .toast { position: fixed; right: 22px; bottom: 22px; max-width: 380px; padding: 16px 18px; border-radius: 18px; background: #111827; color: white; box-shadow: 0 20px 50px rgba(15, 23, 42, 0.26); display: none; z-index: 50; }
      .toast.show { display: block; }
      .toast.success { background: linear-gradient(135deg, #0f766e, #115e59); }
      .toast.error { background: linear-gradient(135deg, #b91c1c, #991b1b); }
      .toast strong { display: block; margin-bottom: 6px; font-size: 14px; }
      .toast p { margin: 0; font-size: 13px; line-height: 1.6; color: rgba(255,255,255,0.92); }
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
                <div id="reportReadiness" class="readiness-note warning">Select a lead to check whether a visible report is ready for the client portal.</div>
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
              <div class="section-card">
                <h3>Section 1: Planetary Analysis</h3>
                <p>This is the main reading you want the client to see in the report and portal.</p>
                <div class="field" style="margin-bottom:0;">
                  <label for="analysisBody">Planetary Analysis</label>
                  <textarea id="analysisBody" name="analysisBody" placeholder="Write the full planetary analysis here..." required></textarea>
                </div>
              </div>
              <div class="section-card">
                <h3>Section 2: Remedies</h3>
                <p>Add practical remedies, rituals, gemstones, fasting guidance, or follow-up spiritual actions.</p>
                <div class="field" style="margin-bottom:0;">
                  <label for="remediesBody">Recommended Remedies</label>
                  <textarea id="remediesBody" name="remediesBody" placeholder="Write remedies and next steps here..."></textarea>
                </div>
              </div>
              <div class="section-card">
                <h3>Section 3: Mantra And Blog Links</h3>
                <p>Add one item per line. You can paste mantra links, blog links, or plain guidance text.</p>
                <div class="field" style="margin-bottom:0;">
                  <label for="resourceLinksBody">Mantra / Blog Links</label>
                  <textarea id="resourceLinksBody" name="resourceLinksBody" placeholder="Hanuman Chalisa - https://www.soulinfinity.space/blog/mantra&#10;Shani remedy guide - https://www.soulinfinity.space/blog/..."></textarea>
                </div>
              </div>
              <div class="field">
                <label for="adminNotes">Admin Notes</label>
                <textarea id="adminNotes" name="adminNotes" placeholder="Private follow-up notes, reminders, or delivery instructions..."></textarea>
              </div>
              <div class="field">
                <label><input type="checkbox" name="visibleToClient" style="width:auto; margin-right:8px;" /> Visible to client now</label>
              </div>
              <div class="field">
                <label><input type="checkbox" name="pdfEnabled" style="width:auto; margin-right:8px;" /> Generate downloadable PDF for client</label>
                <div class="helper">Only reports with this checked will show a PDF download button inside the secure client portal.</div>
              </div>
              <div class="button-row">
                <button type="submit">Save Analysis</button>
                <button type="button" id="reset-report-form" class="secondary">Start New Report</button>
              </div>
              <div class="helper-inline">After save, the report text will clear so you can immediately start the next report without mixing old content.</div>
            </form>
            <div id="report-reset-note" class="save-badge"></div>
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
                <div id="linkReadiness" class="readiness-note warning">Select a lead first. A secure link should be generated only after at least one report is visible to the client.</div>
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
                      <th>PDF</th>
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
    <div id="admin-toast" class="toast" role="status" aria-live="polite"></div>

    <script>
      const leads = ${leadDataJson};
      const recentThreshold = Date.now() - 5 * 24 * 60 * 60 * 1000;
      let toastTimer;

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

      function clearStatus(elementId) {
        const node = document.getElementById(elementId);
        if (!node) return;
        node.className = 'status';
        node.innerHTML = '';
      }

      function showToast(tone, title, message) {
        const node = document.getElementById('admin-toast');
        if (!node) return;
        node.className = 'toast show ' + tone;
        node.innerHTML = '<strong>' + title + '</strong><p>' + escapeInlineHtml(message || '') + '</p>';
        window.clearTimeout(toastTimer);
        toastTimer = window.setTimeout(() => {
          node.className = 'toast';
          node.innerHTML = '';
        }, 4200);
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

      function renderLeadReadiness(nodeId, lead) {
        const node = document.getElementById(nodeId);
        if (!node) return;
        if (!lead) {
          node.className = 'readiness-note warning';
          node.textContent = 'Select a lead to check whether a visible report is ready for the client portal.';
          return;
        }

        const summary = lead.reportSummary || {};
        const visibleReports = Number(summary.visibleReports || 0);
        const totalReports = Number(summary.totalReports || 0);
        const pdfReports = Number(summary.pdfReports || 0);
        const latestVisibleTitle = String(summary.latestVisibleTitle || '').trim();

        if (visibleReports > 0) {
          node.className = 'readiness-note ready';
          node.innerHTML = '<strong>Portal ready.</strong> ' +
            visibleReports + ' visible report' + (visibleReports === 1 ? '' : 's') +
            ' found for this client' +
            (latestVisibleTitle ? '. Latest visible report: ' + escapeInlineHtml(latestVisibleTitle) + '.' : '.') +
            (pdfReports > 0 ? ' PDF download is enabled on at least one report.' : '');
          return;
        }

        node.className = 'readiness-note warning';
        node.innerHTML = '<strong>Portal not ready yet.</strong> ' +
          (totalReports > 0
            ? 'This client has saved report drafts, but none are marked visible to the client.'
            : 'No saved report exists for this client yet.') +
          ' Save the analysis and tick "Visible to client now" before generating the secure link.';
      }

      function createLeadPicker(config) {
        const searchInput = document.getElementById(config.searchId);
        const select = document.getElementById(config.selectId);
        const quickLeads = document.getElementById(config.quickId);
        const metaId = config.metaId;
        const readinessId = config.readinessId;
        const statusToClear = config.statusToClear;

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
          renderLeadReadiness(readinessId, activeLead);
          if (statusToClear) {
            clearStatus(statusToClear);
          }
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
              renderLeadReadiness(readinessId, activeLead);
              if (statusToClear) {
                clearStatus(statusToClear);
              }
            });
          });
        }

        searchInput.addEventListener('input', () => {
          fillOptions();
          if (statusToClear) {
            clearStatus(statusToClear);
          }
        });
        select.addEventListener('change', () => {
          const activeLead = leads.find((lead) => lead.id === select.value) || null;
          renderLeadMeta(metaId, activeLead);
          renderLeadReadiness(readinessId, activeLead);
          if (statusToClear) {
            clearStatus(statusToClear);
          }
        });

        fillQuickLeads();
        fillOptions();
        renderLeadReadiness(readinessId, leads.find((lead) => lead.id === select.value) || null);
      }

      createLeadPicker({
        searchId: 'reportLeadSearch',
        selectId: 'submissionId',
        quickId: 'reportQuickLeads',
        metaId: 'reportLeadMeta',
        readinessId: 'reportReadiness',
        statusToClear: 'report-status',
      });

      createLeadPicker({
        searchId: 'linkLeadSearch',
        selectId: 'linkSubmissionId',
        quickId: 'linkQuickLeads',
        metaId: 'linkLeadMeta',
        readinessId: 'linkReadiness',
        statusToClear: 'link-status',
      });

      function resetReportDraft() {
        const reportForm = document.getElementById('report-form');
        if (!reportForm) return;
        const titleInput = document.getElementById('title');
        const reportTypeInput = document.getElementById('reportType');
        const analysisBody = document.getElementById('analysisBody');
        const remediesBody = document.getElementById('remediesBody');
        const resourceLinksBody = document.getElementById('resourceLinksBody');
        const adminNotes = document.getElementById('adminNotes');
        const visibleCheckbox = reportForm.querySelector('input[name="visibleToClient"]');
        const pdfCheckbox = reportForm.querySelector('input[name="pdfEnabled"]');

        if (titleInput) titleInput.value = '';
        if (reportTypeInput) reportTypeInput.value = 'Kundali Analysis';
        if (analysisBody) analysisBody.value = '';
        if (remediesBody) remediesBody.value = '';
        if (resourceLinksBody) resourceLinksBody.value = '';
        if (adminNotes) adminNotes.value = '';
        if (visibleCheckbox) visibleCheckbox.checked = false;
        if (pdfCheckbox) pdfCheckbox.checked = false;
      }

      function showResetNote(message) {
        const note = document.getElementById('report-reset-note');
        if (!note) return;
        note.className = 'save-badge show';
        note.innerHTML = '<strong>Ready for next report</strong>' + escapeInlineHtml(message);
      }

      document.getElementById('reset-report-form').addEventListener('click', () => {
        resetReportDraft();
        showResetNote('The report fields were cleared. Select the next lead or continue with the current one.');
        showToast('success', 'Fresh draft started', 'The previous text has been cleared and the form is ready for your next report.');
      });

      document.getElementById('report-form').addEventListener('submit', async (event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const payload = Object.fromEntries(form.entries());
        payload.visibleToClient = form.get('visibleToClient') === 'on';
        payload.pdfEnabled = form.get('pdfEnabled') === 'on';

        try {
          const result = await postJson('/api/admin/reports', payload);
          showStatus('report-status', 'success', 'Analysis saved successfully.', JSON.stringify(result, null, 2));
          clearStatus('link-status');
          const savedLead = leads.find((lead) => lead.id === payload.submissionId);
          if (savedLead) {
            savedLead.reportSummary = savedLead.reportSummary || { totalReports: 0, visibleReports: 0, pdfReports: 0, latestVisibleTitle: '' };
            savedLead.reportSummary.totalReports += 1;
            if (payload.visibleToClient) {
              savedLead.reportSummary.visibleReports += 1;
              savedLead.reportSummary.latestVisibleTitle = payload.title || savedLead.reportSummary.latestVisibleTitle;
            }
            if (payload.pdfEnabled) {
              savedLead.reportSummary.pdfReports += 1;
            }
            renderLeadReadiness('reportReadiness', savedLead);
            renderLeadReadiness('linkReadiness', savedLead);
          }
          resetReportDraft();
          const visibilityMessage = payload.visibleToClient
            ? 'The report is live in the client portal now.'
            : 'The report was saved as a draft, so the client portal will still show no analysis until you tick "Visible to client now".';
          showResetNote('Saved for ' + (result.emailAddress || 'the selected client') + '. ' + visibilityMessage + ' The text areas were cleared so you can start a new report safely.');
          showToast('success', 'Report saved', visibilityMessage);
        } catch (error) {
          showStatus('report-status', 'error', 'Unable to save analysis.', error instanceof Error ? error.message : String(error));
          showToast('error', 'Save failed', error instanceof Error ? error.message : String(error));
        }
      });

      document.getElementById('link-form').addEventListener('submit', async (event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const payload = Object.fromEntries(form.entries());
        const selectedLead = leads.find((lead) => lead.id === payload.submissionId) || null;

        if (!selectedLead) {
          showStatus('link-status', 'error', 'Lead selection is required.', 'Please select a saved lead before generating the secure link.');
          showToast('error', 'Lead not selected', 'Choose the client first, then generate the secure portal link.');
          return;
        }

        const visibleReports = Number(selectedLead.reportSummary?.visibleReports || 0);
        if (visibleReports < 1) {
          showStatus('link-status', 'error', 'Visible report required first.', 'Save the analysis and tick "Visible to client now" before generating the client access link.');
          renderLeadReadiness('linkReadiness', selectedLead);
          showToast('error', 'Portal not ready', 'This client does not have a visible report yet, so the secure link was stopped.');
          return;
        }

        try {
          const result = await postJson('/api/admin/access-links', payload);
          showStatus('link-status', 'success', 'Secure link generated.', result.portalLink || JSON.stringify(result, null, 2));
          showToast('success', 'Secure link ready', 'The client access link has been generated and is shown on the screen.');
        } catch (error) {
          showStatus('link-status', 'error', 'Unable to generate link.', error instanceof Error ? error.message : String(error));
          showToast('error', 'Link generation failed', error instanceof Error ? error.message : String(error));
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
          consultation_type,
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
            ar.pdf_enabled,
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
          buildPortalBaseUrl('', env, request.url),
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
      const analysisBody = normalizeWhitespace(payload.analysisBody || payload.reportBody || '');
      const remediesBody = normalizeWhitespace(payload.remediesBody || '');
      const resourceLinksBody = normalizeWhitespace(payload.resourceLinksBody || '');
      const reportBody = combineReportSections({
        analysisBody,
        remediesBody,
        resourceLinksBody,
      });
      const adminNotes = String(payload.adminNotes || '').trim();
      const visibleToClient = parseBoolean(payload.visibleToClient);
      const pdfEnabled = parseBoolean(payload.pdfEnabled);

      if (!submissionId || !title || !analysisBody) {
        return json({ error: 'Lead, report title, and planetary analysis are required.' }, 400, corsHeaders);
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
          analysis_body,
          remedies_body,
          resource_links_body,
          admin_notes,
          pdf_enabled,
          pdf_generated_at,
          visible_to_client,
          created_at,
          updated_at,
          published_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      )
        .bind(
          reportId,
          submissionId,
          title,
          reportType,
          reportBody,
          analysisBody,
          remediesBody,
          resourceLinksBody,
          adminNotes,
          pdfEnabled ? 1 : 0,
          pdfEnabled ? now : '',
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
          pdfEnabled,
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
      const portalBaseUrl = buildPortalBaseUrl(payload.portalBaseUrl, env, request.url);
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

    const reportPdfMatch = url.pathname.match(/^\/api\/portal\/reports\/([^/]+)\/pdf$/);
    if (reportPdfMatch && request.method === 'GET') {
      if (origin && !isAllowedOrigin(origin, env)) {
        return json({ error: 'Origin not allowed.' }, 403, corsHeaders);
      }

      const session = await resolvePortalSession(env, request);
      if (!session) {
        return json({ error: 'Portal session is invalid or expired.' }, 401, corsHeaders);
      }

      const reportId = decodeURIComponent(reportPdfMatch[1] || '').trim();
      if (!reportId) {
        return json({ error: 'Report selection is required.' }, 400, corsHeaders);
      }

      const report = await loadReportForSession(env, session.email_address, reportId);
      if (!report) {
        return json({ error: 'This report is not available for download.' }, 404, corsHeaders);
      }

      if (!report.pdf_enabled) {
        return json({ error: 'PDF download is not enabled for this report yet.' }, 403, corsHeaders);
      }

      try {
        const pdfBytes = await createReportPdf(report, report);
        const filenameBase = `${report.full_name || 'soul-infinity-client'}-${report.title || 'analysis-report'}`
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '') || 'analysis-report';

        await env.CONTACT_DB.prepare(
          `UPDATE analysis_reports
          SET pdf_generated_at = ?
          WHERE id = ?`
        )
          .bind(new Date().toISOString(), report.id)
          .run();

        return new Response(pdfBytes, {
          status: 200,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/pdf',
            'Cache-Control': 'no-store',
            'Content-Disposition': `attachment; filename="${filenameBase}.pdf"`,
          },
        });
      } catch (error) {
        return json(
          {
            error:
              error instanceof Error
                ? error.message
                : 'We could not prepare the PDF report right now.',
          },
          500,
          corsHeaders,
        );
      }
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
        consultation_type,
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
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
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
        String(payload.consultationType || '').trim(),
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
