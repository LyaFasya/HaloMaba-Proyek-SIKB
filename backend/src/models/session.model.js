import { createHash, randomBytes } from "node:crypto"
import { db } from "../config/database.js"

export const sessionMaxAge = 7 * 24 * 60 * 60 * 1000
const hashToken = (token) => createHash("sha256").update(token).digest("hex")
const validToken = (token) =>
  typeof token === "string" && /^[a-f0-9]{64}$/.test(token)

export async function createSession(accountId) {
  const token = randomBytes(32).toString("hex")
  const now = Date.now()
  await db.execute("DELETE FROM sessions WHERE expires_at <= ?", [now])
  await db.execute(
    "INSERT INTO sessions (token_hash, account_id, expires_at) VALUES (?, ?, ?)",
    [hashToken(token), accountId, now + sessionMaxAge],
  )
  return token
}

export async function findSessionAccount(token) {
  if (!validToken(token)) return null
  const [rows] = await db.execute(
    "SELECT account_id FROM sessions WHERE token_hash = ? AND expires_at > ?",
    [hashToken(token), Date.now()],
  )
  return rows[0]?.account_id ?? null
}

export async function deleteSession(token) {
  if (validToken(token)) {
    await db.execute("DELETE FROM sessions WHERE token_hash = ?", [hashToken(token)])
  }
}
