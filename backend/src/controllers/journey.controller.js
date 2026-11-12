import { checkpointIds, getChecks, setCheck } from "../models/journey.model.js"

export function showProgress(req, res) {
  return res.json({ checks: getChecks(req.accountId) })
}

export function updateProgress(req, res) {
  const { id } = req.params
  const { checked } = req.body ?? {}
  if (!checkpointIds.has(id) || typeof checked !== "boolean") {
    return res
      .status(400)
      .json({ error: "Checkpoint atau status tidak valid." })
  }

  setCheck(req.accountId, id, checked)
  return res.json({ id, checked })
}
