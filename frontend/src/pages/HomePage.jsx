import Icon from "../components/Icon"
import Robot from "../components/Robot"
import { guides, programs } from "../data"

export default function HomePage({
  signedIn,
  complete,
  nickname,
  nextGuide,
  navigate,
  openNova,
}) {
  return (
    <div className="page home-page">
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">
            <span>✦</span> PORTAL PERSIAPAN MABA FILKOM
          </span>
          <h1>
            <span>Halo, {nickname || "Maba"}!</span>
            <br />
            Selamat datang di FILKOM.
          </h1>
          <p>
            Siapkan daftar ulang, orientasi, akun kampus, hingga minggu pertama
            kuliah dalam satu alur yang mudah diikuti.
          </p>
          {signedIn ? (
            <>
              <div className="hero-actions">
                <button className="primary-button" onClick={() => navigate("journey")}>
                  {complete ? "Lanjutkan My Journey" : "Mulai My Journey"}
                  <Icon name="arrow" size={17} />
                </button>
                <button className="secondary-button" onClick={() => navigate("panduan")}>
                  Lihat Panduan
                </button>
              </div>
              <div className="hero-progress">
                <span>{Math.round((complete / guides.length) * 100)}%</span>
                <div>
                  <strong>{complete} dari {guides.length} checkpoint selesai</strong>
                  <small>{nextGuide ? `Berikutnya: ${nextGuide.name}` : "Semua checkpoint selesai"}</small>
                </div>
              </div>
            </>
          ) : (
            <div className="hero-actions">
              <button className="primary-button" onClick={() => navigate("login")}>
                Masuk ke HaloMaba <Icon name="arrow" size={17} />
              </button>
            </div>
          )}
        </div>
        <Robot />
      </section>

      <section className="quick-start">
        <div>
          <span className="section-label">MULAI DARI SINI</span>
          <h2>Tiga hal utama untuk maba.</h2>
        </div>
        <button onClick={() => navigate("journey")}>
          <span className="quick-icon coral">
            <Icon name="check" />
          </span>
          <span>
            <strong>Ikuti checkpoint</strong>
            <small>Kerjakan persiapan bertahap</small>
          </span>
          <Icon name="arrow" size={17} />
        </button>
        <button onClick={() => navigate("panduan")}>
          <span className="quick-icon blue">
            <Icon name="book" />
          </span>
          <span>
            <strong>Buka panduan</strong>
            <small>12 dokumen orientasi & akademik</small>
          </span>
          <Icon name="arrow" size={17} />
        </button>
        <button onClick={openNova}>
          <span className="quick-icon yellow">✦</span>
          <span>
            <strong>Tanya NOVA</strong>
            <small>Cari jawaban dari portal</small>
          </span>
          <Icon name="arrow" size={17} />
        </button>
      </section>

      <section className="section-block history-section">
        <div className="section-heading">
          <div>
            <span className="section-label">KENALI KAMPUSMU</span>
            <h2>Sejarah FILKOM</h2>
            <p>
              Perjalanan Fakultas Ilmu Komputer Universitas Brawijaya dimulai
              dari penggabungan dua program studi dari fakultas yang berbeda.
            </p>
          </div>
          <span className="heading-icon">
            <Icon name="graduation" />
          </span>
        </div>
        <div className="timeline">
          <article>
            <span className="year">2011</span>
            <div>
              <strong>UB membentuk PTIIK</strong>
              <p>
                Pada 27 Oktober, Teknik Perangkat Lunak dari Fakultas Teknik dan
                Ilmu Komputer dari Fakultas MIPA disatukan di bawah Program
                Teknologi Informasi dan Ilmu Komputer.
              </p>
            </div>
          </article>
          <article>
            <span className="year">2014</span>
            <div>
              <strong>PTIIK resmi menjadi FILKOM</strong>
              <p>
                Pada 10 Desember, PTIIK resmi berubah status menjadi Fakultas
                Ilmu Komputer.
              </p>
            </div>
          </article>
        </div>
        <small className="source">Rujukan: Profil dan Sejarah FILKOM UB.</small>
      </section>

      <section className="section-block programs-section">
        <div className="section-heading">
          <div>
            <span className="section-label">JELAJAHI PROGRAM STUDI</span>
            <h2>Lima Prodi Sarjana</h2>
            <p>
              Pilih program studi untuk melihat fokus belajar, departemen, dan
              contoh proyeknya.
            </p>
          </div>
          <span className="heading-icon coral-bg">
            <Icon name="book" />
          </span>
        </div>
        <div className="program-grid">
          {programs.map((program) => (
            <details key={program.id} className="program-card">
              <summary>
                <span className="program-code">{program.code}</span>
                <span>
                  <strong>{program.name}</strong>
                  <small>Departemen {program.dept}</small>
                </span>
                <span className="plus">+</span>
              </summary>
              <div>
                <p>{program.focus}</p>
                <p>
                  <strong>Topik belajar.</strong> {program.topics}
                </p>
                <p>
                  <strong>Contoh proyek.</strong> {program.example}
                </p>
              </div>
            </details>
          ))}
        </div>
        <small className="source">
          Rujukan: profil dan kurikulum program studi FILKOM UB. Contoh proyek
          bersifat ilustratif.
        </small>
      </section>

      <section className="home-cards">
        <article className="home-feature journey-feature">
          <span className="feature-icon">
            <Icon name="check" />
          </span>
          <div>
            <span className="section-label">CHECKLIST PRIBADIMU</span>
            <h2>My Journey</h2>
            <p>
              Centang persiapan daftar ulang, orientasi, dan minggu pertama
              kuliah.
            </p>
            {signedIn && <strong>{complete} dari {guides.length} checkpoint selesai</strong>}
          </div>
          <button
            className="primary-button"
            onClick={() => navigate("journey")}
          >
            Buka My Journey <Icon name="arrow" size={17} />
          </button>
        </article>
        <article className="home-feature docs-feature">
          <span className="feature-icon">
            <Icon name="file" />
          </span>
          <div>
            <span className="section-label">RAK DOKUMEN</span>
            <h2>Panduan Maba</h2>
            <p>
              Temukan dokumen orientasi, SIAM, kurikulum prodi, advokasi, dan
              bantuan mahasiswa.
            </p>
            <strong>12 dokumen tersedia</strong>
          </div>
          <button
            className="secondary-button"
            onClick={() => navigate("panduan")}
          >
            Buka Panduan <Icon name="arrow" size={17} />
          </button>
        </article>
      </section>
    </div>
  )
}
