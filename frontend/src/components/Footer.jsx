import Brand from "./Brand"

export default function Footer({ navigate, signedIn }) {
  return (
    <footer>
      <div>
        <Brand />
        <p>
          Portal persiapan kuliah untuk mahasiswa baru FILKOM Universitas
          Brawijaya.
        </p>
      </div>
      <div>
        <strong>Jelajahi</strong>
        <button onClick={() => navigate("beranda")}>Beranda</button>
        {signedIn && (
          <>
            <button onClick={() => navigate("journey")}>My Journey</button>
            <button onClick={() => navigate("panduan")}>Panduan</button>
          </>
        )}
      </div>
      <div>
        <strong>Butuh bantuan?</strong>
        <button onClick={() => navigate("beranda")}>Kenali FILKOM</button>
      </div>
      <small>HaloMaba · Portal Maba FILKOM UB</small>
    </footer>
  )
}
