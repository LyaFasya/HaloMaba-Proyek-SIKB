import { db } from "../config/database.js"

export const checkpointIds = new Set([
  "berkas",
  "ukt",
  "siam",
  "email",
  "orientasi",
  "atribut",
  "kurikulum",
  "krs",
  "pa",
  "jadwal",
])

const list = db.prepare(
  "SELECT checkpoint_id, checked FROM progress WHERE account_id = ?",
)
const upsert = db.prepare(`
  INSERT INTO progress (account_id, checkpoint_id, checked) VALUES (?, ?, ?)
  ON CONFLICT(account_id, checkpoint_id) DO UPDATE SET checked = excluded.checked
`)

export function getChecks(accountId) {
  return Object.fromEntries(
    list.all(accountId).map((row) => [row.checkpoint_id, Boolean(row.checked)]),
  )
}

export function setCheck(accountId, id, checked) {
  upsert.run(accountId, id, Number(checked))
}
