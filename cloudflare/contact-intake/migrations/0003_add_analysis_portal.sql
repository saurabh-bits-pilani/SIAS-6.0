CREATE TABLE IF NOT EXISTS analysis_reports (
  id TEXT PRIMARY KEY,
  submission_id TEXT NOT NULL,
  title TEXT NOT NULL,
  report_type TEXT NOT NULL DEFAULT 'Kundali Analysis',
  report_body TEXT NOT NULL,
  admin_notes TEXT NOT NULL DEFAULT '',
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
