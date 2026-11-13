import { db } from "../config/database.js"

export async function listPrograms() {
  const [rows] = await db.query(
    "SELECT id, code, name, department AS dept, focus, topics, example FROM study_programs ORDER BY sort_order, id",
  )
  return rows
}

export async function programExists(id) {
  const [rows] = await db.execute("SELECT id FROM study_programs WHERE id = ?", [id])
  return rows[0]?.id === id
}

export async function listDocuments() {
  const [rows] = await db.query(
    `SELECT id, title, category AS type, summary, keywords AS \`keys\`,
            drive_id AS driveId, filename, bytes
     FROM documents ORDER BY sort_order, id`,
  )
  return rows
}

export async function listCheckpoints() {
  const [rows] = await db.query(
    `SELECT id, name, intro, steps, done, keywords AS \`keys\`, document_ids AS docs,
            phase_name AS phase, phase_order AS phaseOrder
     FROM checkpoints ORDER BY phase_order, sort_order, id`,
  )
  return rows
}
