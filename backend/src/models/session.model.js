import { createHash, randomBytes } from "node:crypto"
import { db } from "../config/database.js"

export const sessionMaxAge = 7 * 24 * 60 * 60 * 1000
const hashToken = (token) => createHash("sha256").update(token).digest("hex")
const validToken = (token) =>
  typeof token === "string" && /^[a-f0-9]{64}$/.test(token)

const insert = db.prepare(
  "INSERT INTO sessions (token_hash, account_id, expires_at) VALUES (?, ?, ?)",
)
const find = db.prepare(
  "SELECT account_id FROM sessions WHERE token_hash = ? AND expires_at > ?",
)
const remove = db.prepare("DELETE FROM sessions WHERE token_hash = ?")
const removeExpired = db.prepare("DELETE FROM sessions WHERE expires_at <= ?")

export function createSession(accountId) {
  const token = randomBytes(32).toString("hex")
  const now = Date.now()
  removeExpired.run(now)
  insert.run(hashToken(token), accountId, now + sessionMaxAge)
  return token
}

export function findSessionAccount(token) {
  if (!validToken(token)) return null
  return find.get(hashToken(token), Date.now())?.account_id ?? null
}

export function deleteSession(token) {
  if (validToken(token)) remove.run(hashToken(token))
}
