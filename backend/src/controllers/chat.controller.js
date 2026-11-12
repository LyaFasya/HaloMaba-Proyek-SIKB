import { NovaUnavailable } from "../services/gradio.service.js"

export function createChatHandler(askNova) {
  return async (req, res) => {
    const message =
      typeof req.body?.message === "string" ? req.body.message.trim() : ""
    if (!message || message.length > 500) {
      return res
        .status(400)
        .json({ error: "Isi pertanyaan sepanjang 1–500 karakter." })
    }

    try {
      return res.json(await askNova(message))
    } catch (error) {
      if (error instanceof NovaUnavailable)
        return res.status(503).json({ error: error.message })
      throw error
    }
  }
}
