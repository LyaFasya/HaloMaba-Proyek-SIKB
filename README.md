# HaloMaba FILKOM UB

HaloMaba adalah portal orientasi untuk mahasiswa baru Fakultas Ilmu Komputer Universitas Brawijaya. Portal ini membantu mahasiswa mengenal FILKOM, mengikuti langkah persiapan kuliah, membaca dokumen panduan, dan bertanya kepada NOVA.

## Fitur

| Fitur | Kegunaan |
| --- | --- |
| **Beranda** | Mengenal FILKOM, membaca sejarah singkat, dan melihat daftar program studi. Bisa dibuka sebelum login. |
| **My Journey** | Menandai langkah persiapan seperti daftar ulang, aktivasi akun kampus, orientasi, dan persiapan kuliah. Progres tersimpan di akun. |
| **Panduan** | Membaca PDF orientasi dan akademik langsung di halaman. Pratinjau mengikuti izin akses file di Google Drive. |
| **Tanya NOVA** | Bertanya tentang persiapan kuliah dan informasi FILKOM. Jawaban yang memiliki rujukan menampilkan tombol **Lihat sumber**. Riwayat menyimpan 50 pertanyaan terbaru per akun di browser yang sama. |
| **Profil** | Melihat dan memperbarui profil. Mahasiswa bisa mengisi NIM sekali saat masih kosong. |

My Journey, Panduan, Tanya NOVA, dan Profil memerlukan login. Jika pengunjung memilih fitur tersebut dari Beranda, HaloMaba akan membuka halaman login lalu melanjutkan ke fitur yang dipilih setelah berhasil masuk.

## Teknologi

- **Frontend** — React, JavaScript, Vite, dan Tailwind CSS.
- **Backend** — Node.js, Express, dan MySQL 8.4.
- **AI** — NOVA menggunakan RAG dan model Qwen di Google Colab. Backend Express mengirim pertanyaan ke Gradio, lalu meneruskan jawaban dan sumber ke frontend.

## Menjalankan proyek secara lokal

Siapkan **Node.js 24**, **npm**, dan server **MySQL 8.4**. Setelah clone repository, buka folder proyek di VS Code. Jalankan backend dan frontend di dua terminal terpisah.

### 1. Siapkan MySQL dan jalankan backend

Hubungkan MySQL Workbench atau terminal MySQL ke server lokal sebagai admin.
Buat database dan akun khusus HaloMaba. Ganti password contoh dengan password pilihanmu.

```sql
CREATE DATABASE IF NOT EXISTS halomaba CHARACTER SET utf8mb4;
CREATE USER 'halomaba'@'127.0.0.1' IDENTIFIED BY 'GantiDenganPasswordLokal';
GRANT ALL PRIVILEGES ON halomaba.* TO 'halomaba'@'127.0.0.1';
```

Dari folder utama proyek, jalankan:

```bash
cd backend
npm ci
cp -n .env.example .env
```

Isi `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, dan `DB_NAME` di `backend/.env`. Gunakan port server MySQL milikmu. Jika sudah punya `.env`, tambahkan pengaturan `DB_*` dengan tetap memakai konfigurasi Gradio dan akun yang sudah ada.

```bash
npm run db:init
npm run dev
```

Buka [API health](http://127.0.0.1:3000/api/health). Jika backend aktif, hasilnya `{"ok":true}`. Biarkan terminal ini tetap berjalan.

### 2. Jalankan frontend

Buka terminal kedua dari folder utama proyek, lalu jalankan:

```bash
cd frontend
npm ci
npm run dev
```

Buka [HaloMaba](http://localhost:8443). Vite meneruskan request `/api` ke backend pada port `3000`.

### 3. Buat akun lokal

Jika sudah punya akun dan progres dari SQLite, hentikan backend lama, simpan cadangan `backend/data/halomaba.sqlite`, lalu jalankan perintah berikut dari folder `backend` setelah `npm run db:init`. Pastikan tabel `accounts` di MySQL masih kosong.

```bash
npm run db:migrate
```

Migrasi membawa ID akun, profil, hash password, dan checkpoint. File SQLite sumber hanya dibaca. Masuk kembali dengan email dan password lama setelah backend MySQL berjalan.

Untuk instalasi baru tanpa data yang akan dimigrasikan, isi `ACCOUNT_EMAIL` dan `ACCOUNT_FULL_NAME` di `backend/.env` dengan email dan nama yang ingin dipakai. Buka terminal tambahan dari folder utama proyek. Pada macOS dengan shell zsh, jalankan:

```zsh
cd backend
read -rs 'HALOMABA_SEED_PASSWORD?Ketik password akun HaloMaba: '
echo
HALOMABA_SEED_PASSWORD="$HALOMABA_SEED_PASSWORD" npm run seed
unset HALOMABA_SEED_PASSWORD
```

Ketik password pilihanmu, sepanjang 8–128 karakter, lalu tekan Enter. Terminal menyembunyikan ketikan password. Setelah muncul pesan **Akun uji dibuat**, gunakan email dan password tersebut untuk login.

### 4. Hubungkan Tanya NOVA ke Colab

1. Buka notebook NOVA di Google Colab dan jalankan sel hingga Gradio aktif.
2. Salin URL Gradio ke `GRADIO_URL` di `backend/.env`. Backend menggunakan `GRADIO_ENDPOINT=/ask`.
3. Restart backend, login ke HaloMaba, lalu kirim pertanyaan melalui **Tanya NOVA**.

Beranda, login, My Journey, dan Panduan bisa dicoba sebelum Gradio dinyalakan. Saat runtime Colab berhenti, jalankan kembali Gradio dan perbarui `GRADIO_URL` jika alamatnya berubah.

## Struktur proyek

| Folder | Isi |
| --- | --- |
| `backend/` | API Express, autentikasi berbasis sesi, penyimpanan MySQL, dan integrasi Gradio. |
| `frontend/` | Halaman React, komponen antarmuka, dan konfigurasi Vite. |

Gunakan `backend/.env.example` sebagai template konfigurasi lokal. Setelah migrasi, SQLite hanya dipakai sebagai sumber impor.

## NIM

Di halaman **Profil Saya**, klik **Isi NIM** saat kolom masih kosong. Simpan 15 digit yang sesuai dengan kartu mahasiswa atau SIAM. Endpoint `PUT /api/profile/nim` menerima `{ "nim": "..." }` melalui sesi yang aktif. Backend menolak NIM yang sudah dipakai akun lain atau percobaan mengubah NIM yang sudah tersimpan.
