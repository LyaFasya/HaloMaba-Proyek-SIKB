import { Router } from "express"
import {
  showProgress,
  updateProgress,
} from "../controllers/journey.controller.js"
import { requireAuth } from "../middlewares/requireAuth.js"

const router = Router()
router.use(requireAuth)
router.get("/", showProgress)
router.put("/:id", updateProgress)
export default router
