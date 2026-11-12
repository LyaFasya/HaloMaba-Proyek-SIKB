import { updateProfile } from "../models/account.model.js"

const programIds = new Set(["tif", "tkom", "si", "ti", "pti"])

export function editProfile(req, res) {
  const { fullName, nickname = "", program, cohort } = req.body ?? {}
  if (
    typeof fullName !== "string" ||
    !fullName.trim() ||
    fullName.trim().length > 100 ||
    typeof nickname !== "string" ||
    nickname.trim().length > 60 ||
    !programIds.has(program) ||
    typeof cohort !== "string" ||
    !/^20\d{2}$/.test(cohort)
  ) {
    return res
      .status(400)
      .json({ error: "Isi nama lengkap, prodi, dan angkatan dengan benar." })
  }

  const user = updateProfile(req.accountId, {
    fullName: fullName.trim(),
    nickname: nickname.trim(),
    program,
    cohort,
  })
  return res.json({ user })
}
