import { useEffect, useState } from "react"
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import NovaChat from "./components/NovaChat"
import { guides } from "./data"
import DocumentsPage from "./pages/DocumentsPage"
import HomePage from "./pages/HomePage"
import JourneyPage from "./pages/JourneyPage"
import LoginPage from "./pages/LoginPage"
import ProfilePage from "./pages/ProfilePage"
import { api } from "./services/api"

const protectedPages = new Set(["journey", "panduan", "profil", "nova"])

const featureNames = {
  journey: "My Journey",
  panduan: "Panduan",
  nova: "Tanya NOVA",
}

async function loadAccount(profile, signal) {
  const [journey, catalogue] = await Promise.allSettled([
    api("/journey", { signal }),
    api("/documents", { signal }),
  ])

  for (const result of [journey, catalogue]) {
    if (
      result.status === "rejected" &&
      (result.reason.status === 401 || result.reason.name === "AbortError")
    ) {
      throw result.reason
    }
  }

  return {
    profile,
    checks: journey.value?.checks ?? {},
    documents: catalogue.value?.documents ?? [],
    journeyError: journey.reason?.message ?? "",
    documentsError: catalogue.reason?.message ?? "",
  }
}

export default function App() {
  const [page, setPage] = useState("beranda")
  const [documentId, setDocumentId] = useState(null)
  const [novaOpen, setNovaOpen] = useState(false)
  const [account, setAccount] = useState(null)
  const [accountLoading, setAccountLoading] = useState(true)
  const [savingCheck, setSavingCheck] = useState(false)
  const [journeyError, setJourneyError] = useState("")
  const [loginDestination, setLoginDestination] = useState(null)

  useEffect(() => {
    const controller = new AbortController()
    const { signal } = controller

    api("/auth/me", { signal })
      .then(({ user }) => loadAccount(user, signal))
      .then((current) => {
        if (signal.aborted) return
        setAccount(current)
        setJourneyError(current.journeyError)
      })
      .catch(() => {
        if (!signal.aborted) setAccount(null)
      })
      .finally(() => {
        if (!signal.aborted) setAccountLoading(false)
      })

    return () => controller.abort()
  }, [])

  const profile = account?.profile
  const checks = account?.checks ?? {}
  const complete = guides.filter((guide) => checks[guide.id]).length
  const nextGuide = guides.find((guide) => !checks[guide.id])
  const nickname = profile?.nickname?.trim()
  const signedIn = Boolean(account)
  const novaAccountKey = profile ? JSON.stringify([profile.id, profile.email]) : null

  function showPage(target) {
    setPage(target)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  function navigate(target) {
    if (accountLoading && (protectedPages.has(target) || target === "login")) return

    if (!account && protectedPages.has(target)) {
      setLoginDestination(target)
      showPage("login")
      return
    }

    if (target === "nova") {
      setNovaOpen(true)
      return
    }

    setLoginDestination(null)
    showPage(target)
  }

  const openNova = () => navigate("nova")

  function openDocument(id) {
    setDocumentId(id)
    navigate("panduan")
  }

  function expireSession(destination) {
    setAccount(null)
    setNovaOpen(false)
    setJourneyError("")
    setLoginDestination(destination)
    showPage("login")
  }

  async function setCheck(id, checked) {
    if (!account) return

    setJourneyError("")
    setSavingCheck(true)

    try {
      await api("/journey/" + id, {
        method: "PUT",
        body: { checked },
      })

      setAccount((current) =>
        current?.profile.id === profile.id
          ? { ...current, checks: { ...current.checks, [id]: checked } }
          : current,
      )
    } catch (error) {
      if (error.status === 401) expireSession("journey")
      else setJourneyError(error.message)
    } finally {
      setSavingCheck(false)
    }
  }

  async function login(email, password) {
    const { user } = await api("/auth/login", {
      method: "POST",
      body: { email, password },
    })

    const current = await loadAccount(user)
    setAccount(current)
    setJourneyError(current.journeyError)
    setLoginDestination(null)

    if (loginDestination === "nova") {
      showPage("beranda")
      setNovaOpen(true)
    } else {
      showPage(loginDestination ?? "profil")
    }
  }

  async function updateAccount(path, method, body) {
    try {
      const { user } = await api(path, { method, body })

      setAccount((current) =>
        current?.profile.id === user.id ? { ...current, profile: user } : current,
      )
    } catch (error) {
      if (error.status === 401) expireSession("profil")
      else throw error
    }
  }

  const saveProfile = (fields) => updateAccount("/profile", "PATCH", fields)
  const saveNim = (nim) => updateAccount("/profile/nim", "PUT", { nim })

  async function logout() {
    await api("/auth/logout", { method: "POST", body: {} })

    setAccount(null)
    setDocumentId(null)
    setLoginDestination(null)
    setJourneyError("")
    setNovaOpen(false)
    showPage("beranda")
  }

  return (
    <div className="app">
      <Navbar {...{ page, profile, nickname, accountLoading, navigate }} />

      <main>
        {page === "beranda" && (
          <HomePage {...{ signedIn, complete, nickname, nextGuide, navigate, openNova }} />
        )}

        {account && page === "journey" && (
          <JourneyPage
            {...{ complete, checks, setCheck, openNova, openDocument }}
            documents={account.documents}
            checksDisabled={savingCheck}
            error={journeyError}
          />
        )}

        {account && page === "panduan" && (
          <DocumentsPage
            documents={account.documents}
            documentId={documentId}
            onSelect={setDocumentId}
            error={account.documentsError}
          />
        )}

        {page === "login" && (
          <LoginPage
            onLogin={login}
            requestedFeature={featureNames[loginDestination]}
          />
        )}

        {page === "profil" && profile && (
          <ProfilePage {...{ profile, complete, saveProfile, saveNim, logout, navigate }} />
        )}
      </main>

      {signedIn && (
        <button className="floating-nova" onClick={openNova}>
          <span className="floating-nova-icon">✦</span>
          <span>
            <small>Butuh bantuan?</small>
            <strong>Tanya NOVA</strong>
          </span>
        </button>
      )}

      {novaAccountKey && (
        <NovaChat
          key={novaAccountKey}
          accountKey={novaAccountKey}
          open={novaOpen}
          onClose={() => setNovaOpen(false)}
          onSessionExpired={() => expireSession("nova")}
        />
      )}

      <Footer navigate={navigate} signedIn={signedIn} />
    </div>
  )
}