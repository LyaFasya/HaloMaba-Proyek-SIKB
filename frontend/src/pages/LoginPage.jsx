import { useState } from "react"
import Brand from "../components/Brand"
import Icon from "../components/Icon"
import Robot from "../components/Robot"

export default function LoginPage({ onLogin, requestedFeature }) {
  const [error, setError] = useState("")
  const [pending, setPending] = useState(false)
  const submit = async (event) => {
    event.preventDefault()
    if (pending) return
    const data = new FormData(event.currentTarget)
    setPending(true)
    setError("")
    try {
      await onLogin(
        String(data.get("email") || ""),
        String(data.get("password") || ""),
      )
    } catch (error) {
      setError(error.message)
    } finally {
      setPending(false)
    }
  }
  return (
    <div className="account-page login-page">
      <section className="login-card">
        <div className="login-intro">
          <Brand />
          <span className="login-art-ring ring-one" />
          <span className="login-art-ring ring-two" />
          <div className="login-robot">
            <Robot />
          </div>
          <div className="login-intro-copy">
            <span className="section-label">PORTAL PERSIAPAN MABA</span>
            <h1>Perjalanan kuliahmu dimulai di sini.</h1>
            <p>
              Simpan progres Journey, kelola profil, dan temukan panduan yang
              kamu perlukan.
            </p>
          </div>
        </div>
        <div className="login-form-wrap">
          <span className="login-form-icon">
            <Icon name="user" size={22} />
          </span>
          <span className="section-label">SELAMAT DATANG KEMBALI</span>
          <h2>Masuk ke HaloMaba</h2>
          {requestedFeature && <p>Masuk untuk membuka {requestedFeature}.</p>}
          <p>Buka profil dan lanjutkan persiapan kuliahmu.</p>
          <form className="account-form" onSubmit={submit}>
            <label>
              Email
              <input
                name="email"
                type="email"
                placeholder="nama@email.com"
                autoComplete="username"
                required
              />
            </label>
            <label>
              Password
              <input
                name="password"
                type="password"
                placeholder="Masukkan password"
                autoComplete="current-password"
                required
              />
            </label>
            {error && (
              <p className="account-error" role="alert">
                {error}
              </p>
            )}
            <button className="primary-button" type="submit" disabled={pending}>
              {pending ? "Sedang masuk…" : "Masuk ke akun"}{" "}
              <Icon name="arrow" size={16} />
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
