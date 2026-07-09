export interface PortalClientProfile {
  submissionId: string;
  fullName: string;
  emailAddress: string;
  phoneNumber: string;
  country: string;
  placeOfBirth: string;
  preferredLanguage: string;
  discussionMode: string;
  createdAt: string;
}

export interface PortalReport {
  id: string;
  submissionId: string;
  title: string;
  reportType: string;
  reportBody: string;
  analysisBody: string;
  remediesBody: string;
  resourceLinksBody: string;
  pdfEnabled: boolean;
  pdfGeneratedAt: string;
  visibleToClient: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  fullName: string;
  country: string;
  placeOfBirth: string;
}

export interface PortalSessionPayload {
  client: PortalClientProfile | null;
  reports: PortalReport[];
}

export interface RedeemPortalLinkResult extends PortalSessionPayload {
  sessionToken: string;
  expiresAt: string;
  deliveryEmail: string;
}

const LIVE_PORTAL_API_BASE =
  'https://soul-infinity-contact-intake.saurabhiim.workers.dev';
const STAGING_PORTAL_API_BASE =
  'https://soul-infinity-contact-intake-staging.saurabhiim.workers.dev';

export function getPortalApiBaseUrl(): string {
  const override = import.meta.env.VITE_PORTAL_API_URL?.trim();
  if (override) {
    return override;
  }

  const isProduction =
    import.meta.env.VITE_SITE_ENV === 'production' ||
    import.meta.env.VERCEL_ENV === 'production';

  return isProduction ? LIVE_PORTAL_API_BASE : STAGING_PORTAL_API_BASE;
}

async function readJson<T>(response: Response): Promise<T> {
  const body = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      body &&
      typeof body === 'object' &&
      'error' in body &&
      typeof body.error === 'string'
        ? body.error
        : 'Portal request failed.';
    throw new Error(message);
  }

  return body as T;
}

export async function redeemPortalAccessLink(token: string): Promise<RedeemPortalLinkResult> {
  const response = await fetch(`${getPortalApiBaseUrl()}/api/portal/redeem-link`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token }),
  });

  return readJson<RedeemPortalLinkResult>(response);
}

export async function fetchPortalSession(sessionToken: string): Promise<PortalSessionPayload & { expiresAt: string }> {
  const response = await fetch(`${getPortalApiBaseUrl()}/api/portal/session`, {
    headers: {
      Authorization: `Bearer ${sessionToken}`,
    },
  });

  return readJson<PortalSessionPayload & { expiresAt: string }>(response);
}

export async function logoutPortalSession(sessionToken: string): Promise<void> {
  await fetch(`${getPortalApiBaseUrl()}/api/portal/logout`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${sessionToken}`,
    },
  });
}

export async function downloadPortalReportPdf(sessionToken: string, reportId: string): Promise<Blob> {
  const response = await fetch(`${getPortalApiBaseUrl()}/api/portal/reports/${encodeURIComponent(reportId)}/pdf`, {
    headers: {
      Authorization: `Bearer ${sessionToken}`,
    },
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    const message =
      body &&
      typeof body === 'object' &&
      'error' in body &&
      typeof body.error === 'string'
        ? body.error
        : 'Unable to download the PDF report.';
    throw new Error(message);
  }

  return await response.blob();
}
