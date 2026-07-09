CREATE TABLE IF NOT EXISTS contact_submissions (
  id TEXT PRIMARY KEY,
  full_name TEXT NOT NULL,
  gender TEXT NOT NULL,
  birth_day INTEGER NOT NULL,
  birth_month TEXT NOT NULL,
  birth_year INTEGER NOT NULL,
  birth_hour INTEGER NOT NULL,
  birth_meridiem TEXT NOT NULL DEFAULT '',
  birth_minute INTEGER NOT NULL,
  birth_second INTEGER NOT NULL,
  country TEXT NOT NULL,
  place_of_birth TEXT NOT NULL,
  preferred_language TEXT NOT NULL DEFAULT '',
  discussion_mode TEXT NOT NULL DEFAULT '',
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

CREATE TABLE IF NOT EXISTS analysis_reports (
  id TEXT PRIMARY KEY,
  submission_id TEXT NOT NULL,
  title TEXT NOT NULL,
  report_type TEXT NOT NULL DEFAULT 'Kundali Analysis',
  report_body TEXT NOT NULL,
  analysis_body TEXT NOT NULL DEFAULT '',
  remedies_body TEXT NOT NULL DEFAULT '',
  resource_links_body TEXT NOT NULL DEFAULT '',
  admin_notes TEXT NOT NULL DEFAULT '',
  pdf_enabled INTEGER NOT NULL DEFAULT 0,
  pdf_generated_at TEXT NOT NULL DEFAULT '',
  visible_to_client INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  published_at TEXT NOT NULL DEFAULT ''
);

CREATE INDEX IF NOT EXISTS idx_analysis_reports_submission_id
  ON analysis_reports (submission_id);

CREATE INDEX IF NOT EXISTS idx_analysis_reports_visible_updated
  ON analysis_reports (visible_to_client, updated_at DESC);

CREATE TABLE IF NOT EXISTS portal_access_links (
  id TEXT PRIMARY KEY,
  submission_id TEXT NOT NULL,
  email_address TEXT NOT NULL,
  token_hash TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  consumed_at TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_portal_access_links_token_hash
  ON portal_access_links (token_hash);

CREATE INDEX IF NOT EXISTS idx_portal_access_links_email
  ON portal_access_links (email_address, created_at DESC);

CREATE TABLE IF NOT EXISTS portal_sessions (
  id TEXT PRIMARY KEY,
  submission_id TEXT NOT NULL,
  email_address TEXT NOT NULL,
  session_token_hash TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  revoked_at TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL,
  last_used_at TEXT NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_portal_sessions_token_hash
  ON portal_sessions (session_token_hash);

CREATE INDEX IF NOT EXISTS idx_portal_sessions_email
  ON portal_sessions (email_address, expires_at DESC);
