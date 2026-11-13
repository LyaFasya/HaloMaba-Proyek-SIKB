import { Router } from "express"
import { editProfile, saveNim } from "../controllers/profile.controller.js"
import { requireAuth } from "../middlewares/requireAuth.js"

const router = Router()
router.patch("/", requireAuth, editProfile)
router.put("/nim", requireAuth, saveNim)
export default router
