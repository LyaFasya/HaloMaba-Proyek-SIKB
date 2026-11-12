import express from "express"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/auth.routes.js"
import profileRoutes from "./routes/profile.routes.js"
import journeyRoutes from "./routes/journey.routes.js"
import documentsRoutes from "./routes/documents.routes.js"
import { createChatRoutes } from "./routes/chat.routes.js"
import { createNovaClient } from "./services/gradio.service.js"

export function createApp({
  askNova = createNovaClient({
    url: process.env.GRADIO_URL,
    endpoint: process.env.GRADIO_ENDPOINT || "/ask",
  }),
} = {}) {
  const app = express()
  app.disable("x-powered-by")
  app.use("/api", (req, res, next) => {
    res.set("Cache-Control", "no-store")
    const origin = req.get("Origin")
    if (
      origin &&
      ["POST", "PATCH", "PUT"].includes(req.method) &&
      origin !== `${req.protocol}://${req.get("host")}`
    ) {
      return res.status(403).json({ error: "Asal permintaan tidak diizinkan." })
    }
    next()
  })
  app.use(express.json({ limit: "8kb" }))
  app.use(cookieParser())

  app.get("/api/health", (_req, res) => res.json({ ok: true }))
  app.use("/api/auth", authRoutes)
  app.use("/api/profile", profileRoutes)
  app.use("/api/journey", journeyRoutes)
  app.use("/api/documents", documentsRoutes)
  app.use("/api/chat", createChatRoutes(askNova))
  app.use("/api", (_req, res) =>
    res.status(404).json({ error: "Endpoint tidak ditemukan." }),
  )
  app.use((error, _req, res, _next) => {
    if (error.type === "entity.parse.failed") {
      return res.status(400).json({ error: "Format JSON tidak valid." })
    }
    if (error.type === "entity.too.large") {
      return res.status(413).json({ error: "Data terlalu besar." })
    }
    console.error(error)
    return res.status(500).json({ error: "Terjadi kesalahan pada server." })
  })
  return app
}
