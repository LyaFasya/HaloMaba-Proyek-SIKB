export async function api(path, { method = "GET", body, signal } = {}) {
  const response = await fetch("/api" + path, {
    method,
    signal,
    credentials: "same-origin",
    headers:
      body === undefined ? undefined : { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  }).catch((error) => {
    if (error.name === "AbortError") throw error
    throw new Error("Backend HaloMaba tidak bisa dihubungi.")
  })

  if (response.status === 204) return null
  const data = await response.json().catch(() => null)
  if (!response.ok || !data) {
    const error = new Error(
      data?.error || "Backend HaloMaba belum memberikan respons yang valid.",
    )
    error.status = response.status
    throw error
  }
  return data
}
