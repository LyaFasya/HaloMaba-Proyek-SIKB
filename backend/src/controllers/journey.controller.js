import { listCheckpoints } from "../models/catalog.model.js"
import { getChecks, setCheck } from "../models/journey.model.js"

export async function showProgress(req, res) {
  const [checks, checkpoints] = await Promise.all([getChecks(req.accountId), listCheckpoints()])
  return res.json({ checks, checkpoints })
}

export async function updateProgress(req, res) {
  const { id } = req.params
  const { checked } = req.body ?? {}
  if (
    typeof checked !== "boolean" ||
    !/^[a-z][a-z0-9-]{0,31}$/.test(id) ||
    !(await setCheck(req.accountId, id, checked))
  ) {
    return res
      .status(400)
      .json({ error: "Checkpoint atau status tidak valid." })
  }

  return res.json({ id, checked })
}
