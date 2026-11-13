import { readFile } from "node:fs/promises"
import { db } from "../config/database.js"

export async function seedCatalog() {
  const data = JSON.parse(await readFile(new URL("../data/catalog.json", import.meta.url), "utf8"))
  const connection = await db.getConnection()
  try {
    await connection.beginTransaction()
    for (const [order, item] of data.programs.entries()) {
      await connection.execute(
        `INSERT INTO study_programs (id, code, name, department, focus, topics, example, sort_order)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE id = id`,
        [item.id, item.code, item.name, item.dept, item.focus, item.topics, item.example, order],
      )
    }
    for (const [order, item] of data.documents.entries()) {
      await connection.execute(
        `INSERT INTO documents (id, title, category, summary, keywords, drive_id, filename, bytes, sort_order)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE id = id`,
        [item.id, item.title, item.type, item.summary, JSON.stringify(item.keys), item.driveId,
          item.filename, item.bytes, order],
      )
    }
    for (const item of data.checkpoints) {
      await connection.execute(
        `INSERT INTO checkpoints
           (id, name, intro, steps, done, keywords, document_ids, phase_name, phase_order, sort_order)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE id = id`,
        [item.id, item.name, item.intro, JSON.stringify(item.steps), item.done, JSON.stringify(item.keys),
          JSON.stringify(item.docs ?? []), item.phase, item.phaseOrder, item.sortOrder],
      )
    }
    await connection.commit()
  } catch (error) {
    await connection.rollback()
    throw error
  } finally {
    connection.release()
  }
}
