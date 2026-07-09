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

const DEFAULT_PORTAL_API_BASE =
  'https://soul-infinity-contact-intake.saurabhiim.workers.dev';

export function getPortalApiBaseUrl(): string {
  return import.meta.env.VITE_PORTAL_API_URL?.trim() || DEFAULT_PORTAL_API_BASE;
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
