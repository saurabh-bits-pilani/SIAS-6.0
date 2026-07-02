CREATE TABLE IF NOT EXISTS contact_submissions (
  id TEXT PRIMARY KEY,
  full_name TEXT NOT NULL,
  gender TEXT NOT NULL,
  birth_day INTEGER NOT NULL,
  birth_month TEXT NOT NULL,
  birth_year INTEGER NOT NULL,
  birth_hour INTEGER NOT NULL,
  birth_minute INTEGER NOT NULL,
  birth_second INTEGER NOT NULL,
  country TEXT NOT NULL,
  place_of_birth TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  email_address TEXT NOT NULL,
  message_text TEXT NOT NULL DEFAULT '',
  source_page TEXT NOT NULL DEFAULT '/contact',
  origin TEXT NOT NULL DEFAULT '',
  user_agent TEXT NOT NULL DEFAULT '',
  cf_country TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at
  ON contact_submissions (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_contact_submissions_email
  ON contact_submissions (email_address);

CREATE INDEX IF NOT EXISTS idx_contact_submissions_phone
  ON contact_submissions (phone_number);
