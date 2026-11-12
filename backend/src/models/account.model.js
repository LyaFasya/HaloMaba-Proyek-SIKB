import { db } from "../config/database.js"

const userColumns =
  "id, email, full_name AS fullName, nickname, program, cohort"

const byEmail = db.prepare(
  "SELECT id, password_hash FROM accounts WHERE email = ?",
)
const byId = db.prepare(`SELECT ${userColumns} FROM accounts WHERE id = ?`)
const insert = db.prepare(`
  INSERT INTO accounts (email, password_hash, full_name)
  VALUES (?, ?, ?) ON CONFLICT(email) DO NOTHING
`)
const update = db.prepare(`
  UPDATE accounts SET full_name = ?, nickname = ?, program = ?, cohort = ? WHERE id = ?
`)

export const findAccountByEmail = (email) => byEmail.get(email)
export const findUserById = (id) => byId.get(id)
export const insertAccount = (email, hash, fullName) =>
  insert.run(email, hash, fullName).changes > 0

export function updateProfile(id, { fullName, nickname, program, cohort }) {
  update.run(fullName, nickname, program, cohort, id)
  return findUserById(id)
}
