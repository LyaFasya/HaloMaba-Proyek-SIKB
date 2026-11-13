import { sessionCookie } from "../config/session-cookie.js"
import { findSessionAccount } from "../models/session.model.js"

export async function requireAuth(req, res, next) {
  const accountId = await findSessionAccount(req.cookies[sessionCookie])
  if (accountId === null) {
    return res.status(401).json({ error: "Kamu belum login." })
  }

  req.accountId = accountId
  next()
}
