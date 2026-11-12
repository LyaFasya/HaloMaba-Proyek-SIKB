import { scrypt, timingSafeEqual } from "node:crypto"
import { promisify } from "node:util"
import { cookieOptions, sessionCookie } from "../config/session-cookie.js"
import { findAccountByEmail, findUserById } from "../models/account.model.js"
import {
  createSession,
  deleteSession,
  sessionMaxAge,
} from "../models/session.model.js"

const hashPassword = promisify(scrypt)
const fallbackHash = `${"0".repeat(32)}:${"0".repeat(128)}`

export async function login(req, res) {
  const { email, password } = req.body ?? {}
  if (
    typeof email !== "string" ||
    !email.trim() ||
    email.length > 254 ||
    typeof password !== "string" ||
    !password ||
    password.length > 128
  ) {
    return res.status(400).json({ error: "Isi email dan password yang valid." })
  }

  const account = findAccountByEmail(email.trim().toLowerCase())
  const [salt, storedHash] = (account?.password_hash ?? fallbackHash).split(":")
  const inputHash = await hashPassword(password, salt, 64)
  const matches = timingSafeEqual(inputHash, Buffer.from(storedHash, "hex"))

  if (!account || !matches) {
    return res.status(401).json({ error: "Email atau password salah." })
  }

  const token = createSession(account.id)
  deleteSession(req.cookies[sessionCookie])
  res.cookie(sessionCookie, token, { ...cookieOptions, maxAge: sessionMaxAge })
  return res.json({ user: findUserById(account.id) })
}

export function me(req, res) {
  return res.json({ user: findUserById(req.accountId) })
}

export function logout(req, res) {
  deleteSession(req.cookies[sessionCookie])
  res.clearCookie(sessionCookie, cookieOptions)
  return res.status(204).end()
}
