import type { ContactFormData } from './validation';

export interface ContactSubmissionPayload extends ContactFormData {
  sourcePage: string;
  website: string;
}

export interface ContactSubmissionSuccess {
  ok: true;
  id: string;
  createdAt: string;
}

export interface ContactSubmissionFailure {
  ok: false;
  error: string;
}

export type ContactSubmissionResult =
  | ContactSubmissionSuccess
  | ContactSubmissionFailure;

const DEFAULT_CONTACT_API_URL =
  'https://soul-infinity-contact-intake.saurabhiim.workers.dev/api/contact';

export function buildContactSubmissionPayload(
  data: ContactFormData,
  sourcePage: string,
  website = '',
): ContactSubmissionPayload {
  return {
    ...data,
    sourcePage,
    website,
  };
}

export function getContactApiUrl(): string {
  return import.meta.env.VITE_CONTACT_API_URL?.trim() || DEFAULT_CONTACT_API_URL;
}

export async function submitContactLead(
  payload: ContactSubmissionPayload,
): Promise<ContactSubmissionResult> {
  const response = await fetch(getContactApiUrl(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  let body: unknown = null;
  try {
    body = await response.json();
  } catch {
    body = null;
  }

  if (!response.ok) {
    return {
      ok: false,
      error:
        body &&
        typeof body === 'object' &&
        'error' in body &&
        typeof body.error === 'string'
          ? body.error
          : 'Unable to save your request right now.',
    };
  }

  if (
    !body ||
    typeof body !== 'object' ||
    !('id' in body) ||
    typeof body.id !== 'string' ||
    !('createdAt' in body) ||
    typeof body.createdAt !== 'string'
  ) {
    return {
      ok: false,
      error: 'Unexpected response received while saving your request.',
    };
  }

  return {
    ok: true,
    id: body.id,
    createdAt: body.createdAt,
  };
}
