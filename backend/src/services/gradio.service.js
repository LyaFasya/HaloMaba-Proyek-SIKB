import { Client } from "@gradio/client"

export class NovaUnavailable extends Error {}

export function createNovaClient({
  url,
  endpoint = "/ask",
  connect = Client.connect.bind(Client),
} = {}) {
  let connection

  return async function askNova(question) {
    if (!url)
      throw new NovaUnavailable(
        "NOVA belum tersambung. Isi GRADIO_URL di backend/.env.",
      )

    try {
      connection ??= connect(url)
      const client = await connection
      const result = await client.predict(endpoint, { question })
      const answer = result.data?.[0]

      if (typeof answer !== "string" || !answer.trim()) {
        throw new NovaUnavailable(
          "Format jawaban NOVA tidak sesuai dengan endpoint Gradio.",
        )
      }

      const text = answer.trim()
      const sourceStart = text.search(/\n+\s*\*{1,2}Sumber\b/i)
      if (sourceStart < 0) return { answer: text, sources: "" }
      return {
        answer: text.slice(0, sourceStart).trim(),
        sources: text.slice(sourceStart).trim(),
      }
    } catch (error) {
      connection = undefined
      if (error instanceof NovaUnavailable) throw error
      throw new NovaUnavailable(
        "NOVA sedang tidak bisa dihubungi. Cek apakah Gradio di Colab masih aktif.",
      )
    }
  }
}
