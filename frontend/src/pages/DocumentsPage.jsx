import Icon from "../components/Icon"

export default function DocumentsPage({ documents, documentId, onSelect, error }) {
  const categories = [...new Set(documents.map((doc) => doc.type))]
  const active = documents.find((doc) => doc.id === documentId) || documents[0]
  const formatSize = (bytes) =>
    bytes >= 1e6
      ? `${(bytes / 1e6).toFixed(1)} MB`
      : `${Math.round(bytes / 1e3)} KB`
  return (
    <div className="page inner-page">
      <section className="page-hero docs-hero">
        <span className="section-label">RAK DOKUMEN NOVA</span>
        <h1>Panduan Maba</h1>
        <p>
          Temukan dokumen orientasi, akademik, dan bantuan mahasiswa. Pilih
          dokumen untuk membaca PDF aslinya di halaman ini.
        </p>
      </section>
      {active ? <div className="documents-layout">
        <aside className="document-sidebar">
          <div className="document-sidebar-head">
            <h2>Semua dokumen</h2>
            <span>{documents.length}</span>
          </div>
          {categories.map((category) => (
            <section key={category}>
              <h3>{category}</h3>
              {documents
                .filter((doc) => doc.type === category)
                .map((doc) => (
                  <button
                    className={active.id === doc.id ? "active" : ""}
                    aria-pressed={active.id === doc.id}
                    onClick={() => onSelect(doc.id)}
                    key={doc.id}
                  >
                    <span className="pdf-icon">PDF</span>
                    <span>
                      <strong>{doc.title}</strong>
                      <small>{formatSize(doc.bytes)}</small>
                    </span>
                    <Icon name="arrow" size={15} />
                  </button>
                ))}
            </section>
          ))}
        </aside>
        <section className="document-preview">
          <div className="document-preview-head">
            <span className="large-pdf">
              <Icon name="file" size={25} />
            </span>
            <div>
              <span>{active.type}</span>
              <h2>{active.title}</h2>
              <p>{active.summary}</p>
            </div>
            <span className="file-size">PDF · {formatSize(active.bytes)}</span>
          </div>
          <iframe
            key={active.driveId}
            className="document-pdf"
            title={`Pratinjau PDF ${active.title}`}
            src={`https://drive.google.com/file/d/${active.driveId}/preview`}
            loading="lazy"
            allowFullScreen
          />
          <div className="document-actions">
            <a
              href={`https://drive.google.com/file/d/${active.driveId}/view`}
              target="_blank"
              rel="noreferrer"
              className="primary-button"
            >
              Buka di tab baru <Icon name="arrow" size={16} />
            </a>
            <a
              href={`https://drive.google.com/uc?export=download&id=${active.driveId}`}
              target="_blank"
              rel="noreferrer"
              className="secondary-button"
            >
              Unduh PDF <Icon name="download" size={16} />
            </a>
          </div>
          <p className="document-note">
            Pratinjau mengikuti izin akses dokumen di Google Drive.
          </p>
        </section>
      </div> : (
        <p className={error ? "account-error" : "document-note"} role={error ? "alert" : "status"}>
          {error || "Belum ada dokumen panduan."}
        </p>
      )}
    </div>
  )
}
