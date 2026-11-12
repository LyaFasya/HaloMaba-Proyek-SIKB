# HaloMaba · Frontend

Frontend HaloMaba memakai React, JavaScript, Vite, Tailwind CSS, dan stylesheet HaloMaba. Folder hasil ekstrak `frontend` ditempatkan sejajar dengan folder `backend` di proyek.

## Jalankan di Mac

Dari folder yang berisi `frontend` dan `backend`, buka dua terminal.

**Terminal backend**

```bash
cd backend
npm run dev
```

**Terminal frontend**

```bash
cd frontend
npm ci
npm run dev
```

Buka [HaloMaba](http://localhost:8443). Vite meneruskan `/api` ke backend pada port 3000 saat pengembangan. Cek sambungan di [API health lewat Vite](http://localhost:8443/api/health). Untuk login, gunakan akun yang ada di SQLite backend.

## Struktur `src/`

| Lokasi | Isi |
| --- | --- |
| `main.jsx` | Titik masuk React |
| `App.jsx` | Navigasi dan state akun |
| `pages/` | Beranda, My Journey, Panduan, Login, dan Profil |
| `components/` | Navbar, footer, ikon, maskot, dan panel chat NOVA |
| `services/api.js` | Request HTTP ke Express |
| `data.js` | Prodi dan langkah My Journey |
| `index.css` | Styling desain HaloMaba |

## Cek fitur

- **Panduan** menampilkan satu PDF asli dari Drive di panel halaman. Klik judul lain untuk mengganti PDF. Pratinjau mengikuti izin akses Drive.
- **Profil** memakai sesi backend. Buka profil, ubah data, lalu refresh untuk mengecek perubahan.
- **My Journey** menyimpan centang ke akun. My Journey, Panduan, dan Tanya NOVA memerlukan login. Beranda dapat dibuka oleh pengunjung.
- **Tanya NOVA** memanggil API Express. Untuk jawaban asli, jalankan Gradio di Colab dan isi `GRADIO_URL` pada backend.
