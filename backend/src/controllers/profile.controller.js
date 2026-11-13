import { findUserById, setInitialNim, updateProfile } from "../models/account.model.js"

import { programExists } from "../models/catalog.model.js"

export async function editProfile(req, res) {
  const { fullName, nickname = "", program, cohort } = req.body ?? {}
  if (
    typeof fullName !== "string" ||
    !fullName.trim() ||
    fullName.trim().length > 100 ||
    typeof nickname !== "string" ||
    nickname.trim().length > 60 ||
    typeof program !== "string" ||
    !program ||
    program.length > 16 ||
    typeof cohort !== "string" ||
    !/^20\d{2}$/.test(cohort) ||
    !(await programExists(program))
  ) {
    return res
      .status(400)
      .json({ error: "Isi nama lengkap, prodi, dan angkatan dengan benar." })
  }

  const user = await updateProfile(req.accountId, {
    fullName: fullName.trim(),
    nickname: nickname.trim(),
    program,
    cohort,
  })
  return res.json({ user })
}

export async function saveNim(req, res) {
  const nim = typeof req.body?.nim === "string" ? req.body.nim.trim() : ""
  if (!/^[0-9]{15}$/.test(nim)) {
    return res.status(400).json({ error: "NIM harus berisi 15 digit angka." })
  }

  try {
    if (!(await setInitialNim(req.accountId, nim))) {
      return res.status(409).json({ error: "NIM akun ini sudah tersimpan dan terkunci." })
    }
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ error: "NIM ini sudah dipakai oleh akun lain." })
    }
    throw error
  }
  return res.json({ user: await findUserById(req.accountId) })
}
