import { db } from "../config/database.js"

export async function findAccountByEmail(email) {
  const [rows] = await db.execute(
    "SELECT id, password_hash FROM accounts WHERE email = ?",
    [email],
  )
  return rows[0]
}

export async function findUserById(id) {
  const [rows] = await db.execute(
    "SELECT id, email, full_name AS fullName, nickname, program, cohort, nim FROM accounts WHERE id = ?",
    [id],
  )
  return rows[0]
}

export async function insertAccount(email, hash, fullName) {
  try {
    await db.execute(
      "INSERT INTO accounts (email, password_hash, full_name) VALUES (?, ?, ?)",
      [email, hash, fullName],
    )
    return true
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") return false
    throw error
  }
}

export async function updateProfile(id, { fullName, nickname, program, cohort }) {
  await db.execute(
    "UPDATE accounts SET full_name = ?, nickname = ?, program = ?, cohort = ? WHERE id = ?",
    [fullName, nickname, program, cohort, id],
  )
  return findUserById(id)
}

export async function setInitialNim(id, nim) {
  const [result] = await db.execute(
    "UPDATE accounts SET nim = ? WHERE id = ? AND nim IS NULL",
    [nim, id],
  )
  return result.affectedRows === 1
}
