import { DatabaseSync } from "node:sqlite"
import { db } from "./database.js"

const sourcePath = process.argv[2] || new URL("../../data/halomaba.sqlite", import.meta.url)

try {
  const source = new DatabaseSync(sourcePath, { readOnly: true })
  let accounts
  let progress
  try {
    source.exec("BEGIN")
    const columns = new Set(source.prepare("PRAGMA table_info(accounts)").all().map((row) => row.name))
    if (!["id", "email", "password_hash", "full_name"].every((name) => columns.has(name))) {
      throw new Error("Tabel accounts di SQLite tidak sesuai dengan skema HaloMaba.")
    }
    const optional = ["nickname", "program", "cohort"].map((name) =>
      columns.has(name) ? name : `'' AS ${name}`,
    )
    accounts = source.prepare(
      `SELECT id, email, password_hash, full_name, ${optional.join(", ")} FROM accounts ORDER BY id`,
    ).all()
    const hasProgress = source.prepare(
      "SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = 'progress'",
    ).get()
    progress = hasProgress
      ? source.prepare("SELECT account_id, checkpoint_id, checked FROM progress").all()
      : []
    source.exec("COMMIT")
  } finally {
    source.close()
  }

  if (accounts.length === 0) throw new Error("Tidak ada akun di SQLite sumber.")

  const connection = await db.getConnection()
  try {
    await connection.beginTransaction()
    const [existing] = await connection.query("SELECT id FROM accounts ORDER BY id LIMIT 1 FOR UPDATE")
    if (existing.length) {
      throw new Error("Database MySQL tujuan sudah berisi akun. Gunakan database kosong untuk migrasi.")
    }
    for (const account of accounts) {
      await connection.execute(
        `INSERT INTO accounts
         (id, email, password_hash, full_name, nickname, program, cohort)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [account.id, account.email, account.password_hash, account.full_name,
          account.nickname, account.program, account.cohort],
      )
    }
    for (const row of progress) {
      await connection.execute(
        "INSERT INTO progress (account_id, checkpoint_id, checked) VALUES (?, ?, ?)",
        [row.account_id, row.checkpoint_id, row.checked],
      )
    }
    await connection.commit()
    console.log(`Migrasi selesai. ${accounts.length} akun dan ${progress.length} checkpoint dipindah.`)
  } catch (error) {
    await connection.rollback()
    throw error
  } finally {
    connection.release()
  }
} catch (error) {
  const databaseError = error.code && error.sqlMessage
  console.error(databaseError ? `Migrasi gagal (${error.code}).` : error.message)
  process.exitCode = 1
} finally {
  await db.end()
}
