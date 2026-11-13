import { db } from "./config/database.js"
import { createApp } from "./app.js"

const port = Number(process.env.PORT || 3000)
const app = createApp()

try {
  await db.query("SELECT id, nim FROM accounts LIMIT 0")
} catch (error) {
  await db.end()
  console.error(`MySQL belum siap (${error.code || "UNKNOWN"}). Periksa DB_* di .env dan jalankan npm run db:init.`)
  process.exit(1)
}

app.listen(port, "127.0.0.1", () => {
  console.log(`Backend HaloMaba jalan di http://127.0.0.1:${port}`)
})
