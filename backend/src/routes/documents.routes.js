import { Router } from "express"
import { documents } from "../data/documents.js"
import { requireAuth } from "../middlewares/requireAuth.js"

const router = Router()
router.get("/", requireAuth, (_req, res) => res.json({ documents }))

export default router
