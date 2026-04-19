import { describe, it, expect } from 'vitest';
import {
  validateContactForm,
  buildWhatsappUrl,
  type ContactFormData,
} from './validation';

const validData: ContactFormData = {
  fullName: 'Anika Mehta',
  gender: 'Female',
  birthDay: '15',
  birthMonth: 'June',
  birthYear: '1992',
  birthHour: '09',
  birthMinute: '30',
  birthSecond: '00',
  country: 'India',
  placeOfBirth: 'Pune',
  phoneNumber: '+91 90790 53840',
  emailAddress: 'anika@example.com',
  messageText: 'Hello',
};

describe('validateContactForm', () => {
  it('accepts a fully-populated, valid form', () => {
    expect(validateContactForm(validData)).toEqual([]);
  });

  it('rejects invalid email addresses', () => {
    const errors = validateContactForm({ ...validData, emailAddress: 'not-an-email' });
    expect(errors).toContainEqual({
      field: 'emailAddress',
      message: expect.stringContaining('valid email'),
    });
  });

  it('rejects missing required fields', () => {
    const errors = validateContactForm({
      ...validData,
      fullName: '',
      gender: '',
      country: '',
      placeOfBirth: '',
    });
    const fields = errors.map((e) => e.field);
    expect(fields).toEqual(
      expect.arrayContaining(['fullName', 'gender', 'country', 'placeOfBirth']),
    );
  });

  it('rejects February 30 (non-existent calendar date)', () => {
    const errors = validateContactForm({
      ...validData,
      birthDay: '30',
      birthMonth: 'February',
      birthYear: '1995',
    });
    expect(errors).toContainEqual({
      field: 'birthDate',
      message: expect.stringContaining('not a valid calendar date'),
    });
  });

  it('rejects out-of-range hour', () => {
    const errors = validateContactForm({ ...validData, birthHour: '25' });
    expect(errors).toContainEqual({
      field: 'birthDate',
      message: expect.stringContaining('complete time'),
    });
  });

  it('accepts leap-day dates (Feb 29 in a leap year)', () => {
    const errors = validateContactForm({
      ...validData,
      birthDay: '29',
      birthMonth: 'February',
      birthYear: '2000',
    });
    expect(errors).toEqual([]);
  });

  it('rejects leap-day dates in non-leap years', () => {
    const errors = validateContactForm({
      ...validData,
      birthDay: '29',
      birthMonth: 'February',
      birthYear: '2001',
    });
    expect(errors).toContainEqual({
      field: 'birthDate',
      message: expect.stringContaining('not a valid calendar date'),
    });
  });

  it('rejects clearly-bogus phone numbers', () => {
    expect(
      validateContactForm({ ...validData, phoneNumber: 'not-a-phone' }),
    ).toContainEqual({
      field: 'phoneNumber',
      message: expect.stringContaining('valid phone'),
    });
  });
});

describe('buildWhatsappUrl', () => {
  it('URL-encodes every user-supplied field (prevents message-injection)', () => {
    const hostile: ContactFormData = {
      ...validData,
      fullName: 'A&B=C%00',
      messageText: 'line1\nline2&inject=evil',
      placeOfBirth: 'New Delhi & more',
    };
    const url = buildWhatsappUrl('919079053840', hostile);

    // The raw injection characters must not appear decoded in the URL.
    const queryString = url.split('?text=')[1] ?? '';
    expect(queryString).not.toContain('&inject=');
    expect(queryString).not.toContain('\n');
    expect(queryString).not.toContain('%00'); // NUL encoded again
    // And the payload decodes back to the intended text with everything intact.
    const decoded = decodeURIComponent(queryString);
    expect(decoded).toContain('A&B=C%00');
    expect(decoded).toContain('line1\nline2&inject=evil');
  });

  it('uses the supplied phone number', () => {
    const url = buildWhatsappUrl('441234567890', validData);
    expect(url.startsWith('https://wa.me/441234567890?text=')).toBe(true);
  });
});
