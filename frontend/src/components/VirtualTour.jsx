import "./VirtualTour.css"

const tourEmbedUrl = "https://rendicahya.github.io/filkom-virtual-tour/index.htm"
const tourOfficialUrl = "https://filkom.ub.ac.id/tour/"

export default function VirtualTour() {
  return (
    <section className="home-tour" aria-labelledby="home-tour-title">
      <header className="home-tour-heading">
        <div>
          <h2 id="home-tour-title">Virtual Tour FILKOM</h2>
          <p>Geser panorama untuk melihat sekeliling, lalu pilih titik untuk berpindah lokasi.</p>
        </div>
        <span className="home-tour-badge" aria-hidden="true">360°</span>
      </header>
      <iframe
        className="home-tour-frame"
        src={tourEmbedUrl}
        title="Tur virtual 360 derajat FILKOM Universitas Brawijaya"
        loading="lazy"
        sandbox="allow-scripts allow-same-origin"
        allowFullScreen
      />
      <p className="home-tour-source">
        <a href={tourOfficialUrl} target="_blank" rel="noopener noreferrer">
          Tur resmi FILKOM UB · Buka di tab baru
        </a>
      </p>
    </section>
  )
}
