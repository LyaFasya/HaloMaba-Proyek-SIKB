import { sessionCookie } from "../config/session-cookie.js"
import { findSessionAccount } from "../models/session.model.js"

export function requireAuth(req, res, next) {
  const accountId = findSessionAccount(req.cookies[sessionCookie])
  if (accountId === null) {
    return res.status(401).json({ error: "Kamu belum login." })
  }

  req.accountId = accountId
  next()
}
