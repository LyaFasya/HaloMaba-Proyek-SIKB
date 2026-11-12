import { Router } from "express"
import { editProfile } from "../controllers/profile.controller.js"
import { requireAuth } from "../middlewares/requireAuth.js"

const router = Router()
router.patch("/", requireAuth, editProfile)
export default router
