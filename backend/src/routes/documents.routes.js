import { Router } from "express"
import { listDocuments } from "../models/catalog.model.js"
import { requireAuth } from "../middlewares/requireAuth.js"

const router = Router()
router.get("/", requireAuth, async (_req, res) => res.json({ documents: await listDocuments() }))

export default router
