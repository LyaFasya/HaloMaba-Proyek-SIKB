import { randomBytes, scryptSync } from "node:crypto"
import { db } from "../config/database.js"
import { insertAccount } from "../models/account.model.js"

const email = process.env.ACCOUNT_EMAIL?.trim().toLowerCase()
const password = process.env.HALOMABA_SEED_PASSWORD
const fullName = process.env.ACCOUNT_FULL_NAME?.trim()

try {
  if (
    !email ||
    email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    !fullName ||
    fullName.length > 100 ||
    !password ||
    password.length < 8 ||
    password.length > 128
  ) {
    console.error(
      "Isi ACCOUNT_EMAIL, ACCOUNT_FULL_NAME, dan HALOMABA_SEED_PASSWORD (8–128 karakter).",
    )
    process.exitCode = 1
  } else {
    const salt = randomBytes(16).toString("hex")
    const hash = scryptSync(password, salt, 64).toString("hex")
    const created = insertAccount(email, `${salt}:${hash}`, fullName)
    console.log(created ? `Akun uji dibuat: ${email}` : "Akun uji sudah ada.")
  }
} finally {
  db.close()
}
