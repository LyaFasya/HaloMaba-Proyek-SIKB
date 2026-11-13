import { db } from "../config/database.js"

export async function getChecks(accountId) {
  const [rows] = await db.execute(
    "SELECT checkpoint_id, checked FROM progress WHERE account_id = ?",
    [accountId],
  )
  return Object.fromEntries(rows.map((row) => [row.checkpoint_id, Boolean(row.checked)]))
}

export async function setCheck(accountId, id, checked) {
  const value = Number(checked)
  const [result] = await db.execute(
    `INSERT INTO progress (account_id, checkpoint_id, checked)
     SELECT ?, id, ? FROM checkpoints WHERE id = ?
     ON DUPLICATE KEY UPDATE checked = ?`,
    [accountId, value, id, value],
  )
  return result.affectedRows > 0
}
