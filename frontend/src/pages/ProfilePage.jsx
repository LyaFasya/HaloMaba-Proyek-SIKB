import { useState } from "react"
import Icon from "../components/Icon"
import { guides, programs } from "../data"

export default function ProfilePage({
  profile,
  complete,
  saveProfile,
  saveNim,
  logout,
  navigate,
}) {
  const [editing, setEditing] = useState(false)
  const [addingNim, setAddingNim] = useState(false)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState("")
  const selectedProgram = programs.find(
    (program) => program.id === profile.program,
  )
  const initials = profile.fullName
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase()
  const runAction = async (action) => {
    if (pending) return
    setPending(true)
    setError("")
    try {
      await action()
    } catch (error) {
      setError(error.message)
    } finally {
      setPending(false)
    }
  }
  const save = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    runAction(async () => {
      await saveProfile(Object.fromEntries(data))
      setEditing(false)
    })
  }
  const submitNim = (event) => {
    event.preventDefault()
    const { nim } = Object.fromEntries(new FormData(event.currentTarget))
    runAction(async () => {
      await saveNim(nim)
      setAddingNim(false)
    })
  }

  return (
    <div className="page account-page profile-page">
      <div className="account-page-heading">
        <div>
          <span className="section-label">AKUN HALOMABA</span>
          <h1>Profil Saya</h1>
          <p>Kelola identitas dan pantau progres persiapan kuliahmu.</p>
        </div>
        <button
          className="secondary-button"
          disabled={pending}
          onClick={() => runAction(logout)}
        >
          Keluar dari akun
        </button>
      </div>

      {error && (
        <p className="account-error" role="alert">
          {error}
        </p>
      )}
      <div className="profile-layout">
        <section className="profile-main-card">
          <div className="profile-person">
            <span className="account-avatar">{initials}</span>
            <div>
              <h2>{profile.fullName}</h2>
              <p>{selectedProgram?.name || "Program studi belum dipilih"}</p>
            </div>
            <button
              className="secondary-button"
              disabled={pending}
              onClick={() => {
                setError("")
                setEditing((value) => !value)
              }}
            >
              {editing ? "Tutup edit" : "Edit profil"}
            </button>
          </div>

          {!editing ? (
            <dl className="profile-details">
              <div>
                <dt>Nama panggilan</dt>
                <dd>{profile.nickname || "Belum diisi"}</dd>
              </div>
              <div>
                <dt>Angkatan</dt>
                <dd>{profile.cohort || "Belum diisi"}</dd>
              </div>
              <div>
                <dt>Email akun</dt>
                <dd>{profile.email}</dd>
              </div>
              <div>
                <dt>Fakultas</dt>
                <dd>Ilmu Komputer, Universitas Brawijaya</dd>
              </div>
            </dl>
          ) : (
            <form className="profile-edit-form account-form" onSubmit={save}>
              <h3>Edit profil</h3>
              <div className="profile-form-grid">
                <label>
                  Nama lengkap
                  <input
                    name="fullName"
                    maxLength={100}
                    defaultValue={profile.fullName}
                    required
                  />
                </label>
                <label>
                  Nama panggilan
                  <input
                    name="nickname"
                    defaultValue={profile.nickname}
                    maxLength={60}
                  />
                </label>
                <label>
                  Program studi
                  <select
                    name="program"
                    defaultValue={profile.program}
                    required
                  >
                    <option value="">Pilih prodi</option>
                    {programs.map((program) => (
                      <option value={program.id} key={program.id}>
                        {program.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Angkatan
                  <input
                    name="cohort"
                    defaultValue={profile.cohort}
                    inputMode="numeric"
                    pattern="[0-9]{4}"
                    required
                  />
                </label>
              </div>
              <div className="profile-edit-actions">
                <button
                  className="primary-button"
                  type="submit"
                  disabled={pending}
                >
                  {pending ? "Menyimpan…" : "Simpan perubahan"}
                </button>
                <button
                  className="ghost-button"
                  type="button"
                  disabled={pending}
                  onClick={() => setEditing(false)}
                >
                  Batal
                </button>
              </div>
            </form>
          )}

          <section className="profile-nim">
            <div>
              <h3>Nomor Induk Mahasiswa (NIM)</h3>
              <p>{profile.nim || "Belum diisi"}</p>
            </div>
            {profile.nim ? (
              <span className="profile-nim-status">Terkunci</span>
            ) : !addingNim && (
              <button
                className="secondary-button"
                type="button"
                disabled={pending}
                onClick={() => {
                  setError("")
                  setAddingNim(true)
                }}
              >
                Isi NIM
              </button>
            )}
            {addingNim && !profile.nim && (
              <form className="account-form profile-nim-form" onSubmit={submitNim}>
                <label>
                  NIM
                  <input
                    name="nim"
                    inputMode="numeric"
                    pattern="[0-9]{15}"
                    maxLength={15}
                    required
                    autoFocus
                    aria-describedby="nim-help"
                  />
                </label>
                <p id="nim-help">Masukkan 15 digit sesuai kartu mahasiswa atau SIAM. Pastikan sudah benar karena NIM terkunci setelah disimpan.</p>
                <div className="profile-edit-actions">
                  <button className="primary-button" type="submit" disabled={pending}>Simpan NIM</button>
                  <button className="ghost-button" type="button" disabled={pending} onClick={() => setAddingNim(false)}>Batal</button>
                </div>
              </form>
            )}
          </section>
        </section>

        <aside className="profile-side">
          <section className="profile-progress-card">
            <div className="profile-progress-top">
              <span className="heading-icon">
                <Icon name="check" />
              </span>
              <span className="progress-value">
                {Math.round((complete / guides.length) * 100)}%
              </span>
            </div>
            <span className="section-label">PROGRES PERSIAPAN</span>
            <h2>My Journey</h2>
            <p>
              {complete} dari {guides.length} checkpoint sudah selesai.
            </p>
            <div className="profile-progress-track">
              <span style={{ width: `${(complete / guides.length) * 100}%` }} />
            </div>
            <button
              className="primary-button"
              onClick={() => navigate("journey")}
            >
              Lanjutkan Journey <Icon name="arrow" size={16} />
            </button>
          </section>
        </aside>
      </div>
    </div>
  )
}
