ALTER TABLE analysis_reports ADD COLUMN analysis_body TEXT NOT NULL DEFAULT '';
ALTER TABLE analysis_reports ADD COLUMN remedies_body TEXT NOT NULL DEFAULT '';
ALTER TABLE analysis_reports ADD COLUMN resource_links_body TEXT NOT NULL DEFAULT '';
ALTER TABLE analysis_reports ADD COLUMN pdf_enabled INTEGER NOT NULL DEFAULT 0;
ALTER TABLE analysis_reports ADD COLUMN pdf_generated_at TEXT NOT NULL DEFAULT '';

UPDATE analysis_reports
SET analysis_body = report_body
WHERE TRIM(COALESCE(analysis_body, '')) = '';
