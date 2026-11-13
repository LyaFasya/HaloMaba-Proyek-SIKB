import { readFile } from "node:fs/promises"
import { db } from "./database.js"
import { seedCatalog } from "../seeders/seed-catalog.js"

try {
  const schema = await readFile(new URL("./schema.sql", import.meta.url), "utf8")
  for (const statement of schema.split(";").map((sql) => sql.trim()).filter(Boolean)) {
    await db.query(statement)
  }
  await seedCatalog()

  const [constraints] = await db.query(`
    SELECT 1 FROM information_schema.REFERENTIAL_CONSTRAINTS
    WHERE CONSTRAINT_SCHEMA = DATABASE() AND TABLE_NAME = 'progress'
      AND CONSTRAINT_NAME = 'progress_checkpoint_fk'
  `)
  if (!constraints.length) {
    await db.query(`
      ALTER TABLE progress ADD CONSTRAINT progress_checkpoint_fk
      FOREIGN KEY (checkpoint_id) REFERENCES checkpoints(id)
    `)
  }
  console.log("Tabel dan katalog HaloMaba siap di MySQL.")
} finally {
  await db.end()
}
