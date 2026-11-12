import { Router } from "express"
import { createChatHandler } from "../controllers/chat.controller.js"
import { requireAuth } from "../middlewares/requireAuth.js"

export function createChatRoutes(askNova) {
  const router = Router()
  router.post("/", requireAuth, createChatHandler(askNova))
  return router
}
