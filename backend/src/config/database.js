import { mkdirSync } from "node:fs"
import { DatabaseSync } from "node:sqlite"

const dataDir = new URL("../../data/", import.meta.url)
mkdirSync(dataDir, { recursive: true })

export const db = new DatabaseSync(new URL("halomaba.sqlite", dataDir))

db.exec(`
  CREATE TABLE IF NOT EXISTS accounts (
    id INTEGER PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    full_name TEXT NOT NULL
  )
`)
db.exec("PRAGMA busy_timeout = 3000")
db.exec("BEGIN IMMEDIATE")
try {
  const accountColumns = new Set(
    db
      .prepare("PRAGMA table_info(accounts)")
      .all()
      .map((column) => column.name),
  )
  for (const column of ["nickname", "program", "cohort"]) {
    if (!accountColumns.has(column)) {
      db.exec(
        `ALTER TABLE accounts ADD COLUMN ${column} TEXT NOT NULL DEFAULT ''`,
      )
    }
  }

  db.exec(`
    CREATE TABLE IF NOT EXISTS sessions (
      token_hash TEXT PRIMARY KEY,
      account_id INTEGER NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
      expires_at INTEGER NOT NULL
    );
    CREATE INDEX IF NOT EXISTS sessions_expires_at_idx ON sessions (expires_at);

    CREATE TABLE IF NOT EXISTS progress (
      account_id INTEGER NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
      checkpoint_id TEXT NOT NULL,
      checked INTEGER NOT NULL CHECK (checked IN (0, 1)),
      PRIMARY KEY (account_id, checkpoint_id)
    );
  `)
  db.exec("COMMIT")
} catch (error) {
  db.exec("ROLLBACK")
  throw error
}
