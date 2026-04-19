export interface ContactFormData {
  fullName: string;
  gender: string;
  birthDay: string;
  birthMonth: string;
  birthYear: string;
  birthHour: string;
  birthMinute: string;
  birthSecond: string;
  country: string;
  placeOfBirth: string;
  phoneNumber: string;
  emailAddress: string;
  messageText: string;
}

const MONTH_INDEX: Record<string, number> = {
  January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
  July: 6, August: 7, September: 8, October: 9, November: 10, December: 11,
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[+\d][\d\s\-()]{6,20}$/;

export interface ValidationError {
  field: keyof ContactFormData | 'birthDate' | 'form';
  message: string;
}

export function validateContactForm(data: ContactFormData): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!data.fullName.trim()) {
    errors.push({ field: 'fullName', message: 'Please enter your full name.' });
  }
  if (!EMAIL_PATTERN.test(data.emailAddress)) {
    errors.push({ field: 'emailAddress', message: 'Please enter a valid email address.' });
  }
  if (!PHONE_PATTERN.test(data.phoneNumber)) {
    errors.push({ field: 'phoneNumber', message: 'Please enter a valid phone number.' });
  }
  if (!data.country) {
    errors.push({ field: 'country', message: 'Please select a country.' });
  }
  if (!data.placeOfBirth.trim()) {
    errors.push({ field: 'placeOfBirth', message: 'Please enter your place of birth.' });
  }
  if (!data.gender) {
    errors.push({ field: 'gender', message: 'Please select a gender.' });
  }

  const monthIdx = MONTH_INDEX[data.birthMonth];
  const day = Number(data.birthDay);
  const year = Number(data.birthYear);
  if (!data.birthMonth || !Number.isInteger(day) || !Number.isInteger(year) || monthIdx === undefined) {
    errors.push({ field: 'birthDate', message: 'Please select a complete date of birth.' });
  } else {
    const probe = new Date(year, monthIdx, day);
    const valid =
      probe.getFullYear() === year &&
      probe.getMonth() === monthIdx &&
      probe.getDate() === day;
    if (!valid) {
      errors.push({ field: 'birthDate', message: 'The selected date of birth is not a valid calendar date.' });
    }
  }

  const hour = Number(data.birthHour);
  const minute = Number(data.birthMinute);
  const second = Number(data.birthSecond);
  if (
    !Number.isInteger(hour) || hour < 0 || hour > 23 ||
    !Number.isInteger(minute) || minute < 0 || minute > 59 ||
    !Number.isInteger(second) || second < 0 || second > 59
  ) {
    errors.push({ field: 'birthDate', message: 'Please select a complete time of birth.' });
  }

  return errors;
}

export function buildWhatsappUrl(phone: string, data: ContactFormData): string {
  const lines = [
    `Hi, I'm ${data.fullName}`,
    '',
    'Birth Details:',
    `Date: ${data.birthDay}/${data.birthMonth}/${data.birthYear}`,
    `Time: ${data.birthHour}:${data.birthMinute}:${data.birthSecond}`,
    `Place: ${data.placeOfBirth}, ${data.country}`,
    `Gender: ${data.gender}`,
    '',
    'Contact Details:',
    `Email: ${data.emailAddress}`,
    `Phone: ${data.phoneNumber}`,
    '',
    `Message: ${data.messageText}`,
  ];
  const text = encodeURIComponent(lines.join('\n'));
  return `https://wa.me/${phone}?text=${text}`;
}
