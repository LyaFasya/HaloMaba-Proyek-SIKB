import { useEffect, useId, useLayoutEffect, useRef, useState } from "react"
import Icon from "./Icon"
import { api } from "../services/api"

const historyLimit = 50

function readHistory(key) {
  try {
    const history = JSON.parse(localStorage.getItem(key) ?? "[]")
    return Array.isArray(history) ? history.slice(-historyLimit) : []
  } catch {
    return []
  }
}

function NovaMessage({ children }) {
  return (
    <div className="nova-message">
      <span className="nova-message-avatar" aria-hidden="true">
        ✦
      </span>
      <div>{children}</div>
    </div>
  )
}

function NovaSources({ text }) {
  const [open, setOpen] = useState(false)
  const id = useId()
  const sources = (text ?? "")
    .trim()
    .replace(/^\*{0,2}Sumber\*{0,2}\s*:\s*\*{0,2}\s*/i, "")
    .split(/(?:^|\r?\n)\s*[-–•*]\s+/)
    .map((source) => source.trim())
    .filter(Boolean)

  if (sources.length === 0) return null

  return (
    <div className="nova-sources">
      <button
        type="button"
        className="nova-sources-toggle"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((current) => !current)}
      >
        <Icon name="file" size={15} />
        {open ? "Sembunyikan sumber" : "Lihat sumber"}
        <Icon name="chevron" size={15} />
      </button>
      <div className="nova-sources-list" id={id} hidden={!open}>
        <ul>
          {sources.map((source, index) => (
            <li key={index}>{source}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function NovaChat({ accountKey, open, onClose, onSessionExpired }) {
  const storageKey = "halomaba:nova-history:" + accountKey
  const [history, setHistory] = useState(() => readHistory(storageKey))
  const [pendingId, setPendingId] = useState(null)
  const request = useRef(null)
  const conversation = useRef(null)
  const pending = pendingId !== null

  useEffect(() => {
    if (!history.length) return
    try {
      localStorage.setItem(storageKey, JSON.stringify(history))
    } catch {
      // Chat tetap tersedia selama halaman terbuka jika penyimpanan browser gagal.
    }
  }, [history, storageKey])

  useEffect(() => () => request.current?.abort(), [])

  useLayoutEffect(() => {
    const log = conversation.current
    if (open && log) log.scrollTop = log.scrollHeight
  }, [open, history])

  async function ask(message) {
    if (request.current) return

    const controller = new AbortController()
    const id = crypto.randomUUID()
    request.current = controller
    setPendingId(id)
    setHistory((turns) => [...turns, { id, question: message }].slice(-historyLimit))

    try {
      const { answer, sources } = await api("/chat", {
        method: "POST",
        body: { message },
        signal: controller.signal,
      })
      if (!controller.signal.aborted) {
        setHistory((turns) =>
          turns.map((turn) => (turn.id === id ? { ...turn, answer, sources } : turn)),
        )
      }
    } catch (error) {
      if (controller.signal.aborted) return
      if (error.status === 401) onSessionExpired()
      else {
        setHistory((turns) =>
          turns.map((turn) => (turn.id === id ? { ...turn, error: error.message } : turn)),
        )
      }
    } finally {
      request.current = null
      if (!controller.signal.aborted) setPendingId(null)
    }
  }

  function submit(event) {
    event.preventDefault()
    const input = event.currentTarget.elements.namedItem("question")
    if (!request.current && input.value.trim()) {
      ask(input.value.trim())
      input.value = ""
    }
  }

  if (!open) return null

  return (
    <div className="nova-overlay" onMouseDown={onClose}>
      <aside
        className="nova-panel"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header>
          <div>
            <span className="floating-nova-icon">✦</span>
            <span>
              <strong>Tanya NOVA</strong>
              <small><i /> Asisten HaloMaba</small>
            </span>
          </div>
          <button onClick={onClose} aria-label="Tutup Tanya NOVA">
            ×
          </button>
        </header>

        <div className="nova-reply" ref={conversation} role="log" aria-label="Percakapan NOVA">
          {history.length === 0 && (
            <NovaMessage>
              <strong>Hai, Maba!</strong>
              <p>Apa yang mau kamu tanyakan?</p>
            </NovaMessage>
          )}

          {history.map(({ id, question, answer, sources, error }) => (
            <div className="nova-turn" key={id}>
              <span className="user-bubble">{question}</span>
              <NovaMessage>
                <strong>NOVA</strong>
                <p className="nova-answer">
                  {id === pendingId
                    ? "NOVA sedang menjawab…"
                    : error || answer || "Jawaban belum tersimpan. Coba kirim ulang pertanyaanmu."}
                </p>
              </NovaMessage>
              <NovaSources text={sources} />
            </div>
          ))}
        </div>

        <div className="nova-prompts">
          <button disabled={pending} onClick={() => ask("Apa saja barang yang dibawa saat orientasi?")}>
            <span>Persiapan orientasi</span>
            <Icon name="arrow" size={14} />
          </button>
          <button disabled={pending} onClick={() => ask("KRS semester pertama gimana?")}>
            <span>Cek KRS</span>
            <Icon name="arrow" size={14} />
          </button>
          <button disabled={pending} onClick={() => ask("Sistem Informasi belajar apa?")}>
            <span>Kenali prodi</span>
            <Icon name="arrow" size={14} />
          </button>
        </div>

        <form onSubmit={submit}>
          <input name="question" placeholder="Tulis pertanyaanmu…" maxLength={250} />
          <button className="primary-button" disabled={pending}>
            <Icon name="send" size={17} /> Kirim
          </button>
        </form>
      </aside>
    </div>
  )
}