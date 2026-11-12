import Icon from "../components/Icon"
import { guides, journeyPhases } from "../data"

export default function JourneyPage({
  complete,
  checks,
  documents,
  setCheck,
  checksDisabled,
  error,
  openNova,
  openDocument,
}) {
  return (
    <div className="page inner-page">
      <section className="page-hero journey-hero">
        <span className="section-label">START YOUR JOURNEY</span>
        <h1>My Journey</h1>
        <p>
          Mulai dari daftar ulang, siapkan orientasi, lalu siap-siap kuliah.
          Buka setiap langkah dan tandai yang sudah beres.
        </p>
      </section>
      <section className="progress-card">
        <div className="progress-copy">
          <span className="progress-ring">
            {Math.round((complete / guides.length) * 100)}%
          </span>
          <div>
            <strong>Progres persiapanmu</strong>
            <small>
              {complete} dari {guides.length} langkah selesai
            </small>
          </div>
        </div>
        <div className="progress-track">
          <span style={{ width: `${(complete / guides.length) * 100}%` }} />
        </div>
      </section>

      {error && (
        <p className="account-error" role="alert">
          {error}
        </p>
      )}
      <div className="journey-phases">
        {journeyPhases.map((phase, phaseIndex) => (
          <section className="journey-phase" key={phase.name}>
            <div className="phase-heading">
              <span>0{phaseIndex + 1}</span>
              <div>
                <small>FASE {phaseIndex + 1}</small>
                <h2>{phase.name}</h2>
              </div>
            </div>
            <div className="guide-list">
              {phase.ids.map((id, index) => {
                const guide = guides.find((item) => item.id === id)
                const checked = Boolean(checks[guide.id])
                const guideDocs = "docs" in guide ? guide.docs : undefined
                return (
                  <details
                    className={`guide-card ${checked ? "done" : ""}`}
                    key={guide.id}
                  >
                    <summary>
                      <span className="step-number">
                        {checked ? <Icon name="check" size={17} /> : index + 1}
                      </span>
                      <span className="guide-summary">
                        <strong>{guide.name}</strong>
                        <small>{guide.intro}</small>
                      </span>
                      <label onClick={(event) => event.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={checked}
                          disabled={checksDisabled}
                          onChange={(event) =>
                            setCheck(guide.id, event.target.checked)
                          }
                        />
                        Selesai
                      </label>
                      <Icon name="chevron" size={17} />
                    </summary>
                    <div className="guide-content">
                      <ol>
                        {guide.steps.map((step) => (
                          <li key={step}>{step}</li>
                        ))}
                      </ol>
                      <p className="done-note">
                        <strong>Kapan bisa dicentang?</strong> {guide.done}
                      </p>
                      <div className="guide-actions">
                        <button onClick={openNova}>
                          ✦ Tanya NOVA soal langkah ini
                        </button>
                        {guideDocs?.map((id) => documents.find((doc) => doc.id === id)).filter(Boolean).map((doc) => (
                          <button
                            onClick={() => openDocument(doc.id)}
                            key={doc.id}
                          >
                            {doc.title}
                          </button>
                        ))}
                      </div>
                    </div>
                  </details>
                )
              })}
            </div>
          </section>
        ))}
      </div>

      <section className="support-card">
        <span className="heading-icon">
          <Icon name="help" />
        </span>
        <div>
          <h2>Kalau butuh bantuan</h2>
          <p>
            Buka panduan advokasi jika ada kendala dan kamu belum tahu harus
            menghubungi siapa. Untuk kendala biaya kuliah, cek panduan bantuan
            keuangan.
          </p>
        </div>
        <button onClick={() => openDocument("advokasi")}>
          Lihat dokumen bantuan <Icon name="arrow" size={16} />
        </button>
      </section>

      <section className="glossary">
        <div>
          <span className="section-label">KAMUS MINI</span>
          <h2>Istilah yang sering muncul</h2>
        </div>
        {[
          [
            "KRS",
            "Kartu Rencana Studi, daftar mata kuliah yang tercatat untuk satu semester.",
          ],
          [
            "KHS",
            "Kartu Hasil Studi, ringkasan hasil studi pada satu semester.",
          ],
          [
            "SKS",
            "Satuan Kredit Semester, satuan beban studi suatu mata kuliah.",
          ],
          [
            "Dosen PA",
            "Dosen Penasihat Akademik yang mendampingi perencanaan studi.",
          ],
        ].map(([term, description]) => (
          <article key={term}>
            <strong>{term}</strong>
            <p>{description}</p>
          </article>
        ))}
      </section>
    </div>
  )
}
