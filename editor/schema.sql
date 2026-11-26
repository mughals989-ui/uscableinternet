CREATE TABLE IF NOT EXISTS page_drafts (path TEXT PRIMARY KEY, edits_json TEXT NOT NULL, updated_by TEXT NOT NULL, updated_at TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS draft_revisions (id INTEGER PRIMARY KEY AUTOINCREMENT, path TEXT NOT NULL, edits_json TEXT NOT NULL, updated_by TEXT NOT NULL, created_at TEXT NOT NULL);
CREATE INDEX IF NOT EXISTS idx_draft_revisions_path_created ON draft_revisions(path, created_at DESC);
