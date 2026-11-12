export const programs = [
  {
    id: "tif",
    code: "IF",
    name: "Teknik Informatika",
    dept: "Teknik Informatika",
    focus:
      "Menggunakan algoritma dan komputasi untuk memecahkan masalah, lalu menerapkannya lewat perangkat lunak.",
    topics:
      "Pemrograman, struktur data, rekayasa perangkat lunak, dan kecerdasan buatan.",
    example:
      "Merancang aplikasi pencarian yang bisa mengurutkan hasil berdasarkan relevansi.",
  },
  {
    id: "tkom",
    code: "TK",
    name: "Teknik Komputer",
    dept: "Teknik Informatika",
    focus:
      "Mempelajari cara perangkat keras dan perangkat lunak bekerja bersama dalam sebuah sistem.",
    topics:
      "Sistem digital, rangkaian elektronika, pemrograman, dan perangkat pintar.",
    example:
      "Membuat prototipe perangkat yang membaca data sensor dan menampilkan hasilnya.",
  },
  {
    id: "si",
    code: "SI",
    name: "Sistem Informasi",
    dept: "Sistem Informasi",
    focus:
      "Memahami kebutuhan pengguna dan proses organisasi, lalu merancang sistem informasi untuk mendukung pekerjaan mereka.",
    topics:
      "Analisis kebutuhan, proses bisnis, basis data, dan desain antarmuka.",
    example:
      "Merancang portal pengajuan dokumen yang bisa dipakai mahasiswa dan staf.",
  },
  {
    id: "ti",
    code: "TI",
    name: "Teknologi Informasi",
    dept: "Sistem Informasi",
    focus:
      "Mempelajari cara mengembangkan, mengintegrasikan, dan mengelola teknologi untuk menjalankan layanan TI.",
    topics: "Sistem dan infrastruktur TI, jaringan, serta integrasi layanan.",
    example:
      "Merancang bagaimana beberapa layanan kampus berbagi akses dan data melalui satu sistem.",
  },
  {
    id: "pti",
    code: "PTI",
    name: "Pendidikan Teknologi Informasi",
    dept: "Sistem Informasi",
    focus:
      "Menggabungkan teknologi informasi dengan perancangan dan pelaksanaan pembelajaran.",
    topics: "Media pembelajaran, pengajaran komputasi, serta evaluasi belajar.",
    example:
      "Membuat media latihan interaktif dan menyusun cara mengevaluasi pemahaman siswa.",
  },
]
export const journeyPhases = [
  {
    name: "Daftar ulang dan akun kampus",
    ids: ["berkas", "ukt", "siam", "email"],
  },
  {
    name: "Persiapan orientasi",
    ids: ["orientasi", "atribut"],
  },
  {
    name: "Minggu pertama kuliah",
    ids: ["kurikulum", "krs", "pa", "jadwal"],
  },
]
export const guides = [
  {
    id: "berkas",
    name: "Siapkan berkas daftar ulang",
    intro:
      "Susun dokumen yang diminta sesuai jalur masuk dan cek kembali sebelum registrasi.",
    keys: ["berkas", "dokumen", "daftar ulang", "registrasi"],
    steps: [
      "Catat jalur masuk, tenggat, dan daftar berkas yang berlaku untukmu.",
      "Kelompokkan dokumen identitas, bukti kelulusan, dan berkas tambahan jika diminta.",
      "Cek keterbacaan dan ukuran file. Simpan bukti registrasi setelah proses selesai.",
    ],
    done: "Berkas yang diminta sudah siap dan status registrasimu sudah kamu cek.",
  },
  {
    id: "ukt",
    name: "Cek UKT dan status registrasi",
    intro:
      "UKT adalah Uang Kuliah Tunggal. Yang perlu dicocokkan adalah identitas, tagihan, dan status registrasi untuk periodemu.",
    keys: [
      "ukt",
      "bayar",
      "tagihan",
      "registrasi",
      "daftar ulang",
      "pembayaran",
    ],
    docs: ["bantuan-keuangan"],
    steps: [
      "Cek apakah identitas, semester, dan jalur masuk pada tagihan sesuai. Catat nominal dan tenggat yang tercantum pada tagihanmu.",
      "Jika ada pembayaran yang perlu dilakukan, cocokkan identitas dan nominal dengan instruksi registrasimu dan simpan bukti transaksi.",
      "Setelah transaksi, periksa apakah status sudah tercatat. Jika belum, siapkan bukti dan waktu pembayaran untuk dilaporkan.",
    ],
    done: "Status registrasi atau pembayaran sudah sesuai dengan kondisi akunmu.",
  },
  {
    id: "siam",
    name: "Siapkan akses SIAM",
    intro:
      "SIAM adalah Sistem Informasi Akademik Mahasiswa. Kamu akan menggunakannya untuk melihat rencana studi, jadwal, dan hasil studi.",
    keys: ["siam", "akun akademik", "nim", "tidak bisa masuk"],
    docs: ["siam"],
    steps: [
      "Siapkan NIM dan informasi akun yang kamu terima dari proses registrasi. Kalau NIM belum terbit, catat dulu bahwa langkah ini masih menunggu akun.",
      "Saat masuk, periksa apakah nama, NIM, dan prodi di profil sudah sesuai.",
      "Kenali KRS untuk daftar mata kuliah, jadwal untuk waktu dan ruang, serta KHS untuk hasil studi.",
      "Kalau gagal masuk, catat pesan galat dan waktunya untuk dilaporkan. Simpan kata sandi hanya untuk dirimu.",
    ],
    done: "Kamu sudah bisa masuk dan melihat identitas akademikmu.",
  },
  {
    id: "email",
    name: "Aktifkan email kampus",
    intro:
      "Akun email mahasiswa UB bisa dipakai untuk komunikasi kampus. Siapkan akses SIAM sebelum mencoba aktivasi.",
    keys: ["email kampus", "email", "surel", "student ub"],
    steps: [
      "Siapkan akun SIAM. Panduan akun mahasiswa UB menempatkan aktivasi alamat @student.ub.ac.id melalui SIAM.",
      "Cari pilihan aktivasi akun mahasiswa, ikuti instruksi yang tampil, lalu catat alamat email yang sudah diberikan.",
      "Uji kotak masuk dengan mengirim satu pesan dan menerima balasan. Pakai alamat lengkap saat menghubungi dosen atau staf.",
    ],
    done: "Kamu sudah bisa membuka kotak masuk dan menerima pesan.",
  },
  {
    id: "orientasi",
    name: "Catat jadwal dan aturan orientasi",
    intro:
      "Sebelum PKKMB dan kegiatan FILKOM, cari tahu kapan, di mana, dan apa yang perlu disiapkan.",
    keys: ["orientasi", "pkkmb", "intrivia", "tata tertib"],
    docs: ["pkkmb", "intrivia"],
    steps: [
      "Buka Buku Panduan PKKMB dan tata tertib INTRIVIA. Cek bagian jadwal, lokasi, dan aturan kehadiran.",
      "Simpan tanggal, jam kumpul, dan titik kumpul di kalender. Tambahkan informasi kelompok jika sudah diumumkan.",
      "Catat tugas pra-kegiatan dan tenggatnya jika ada. Cek kembali informasi terbaru menjelang hari kegiatan.",
    ],
    done: "Jadwal dan lokasi sudah tercatat, dan kamu tahu aturan serta tugas yang berlaku untukmu.",
  },
  {
    id: "atribut",
    name: "Siapkan atribut dan barang bawaan",
    intro:
      "Gunakan PDF Ketentuan Atribut & Barang Bawaan sebagai checklist sebelum berangkat.",
    keys: [
      "atribut",
      "barang bawaan",
      "barang yang dibawa",
      "apa yang harus dibawa",
      "bawa apa",
      "perlengkapan",
      "pakaian",
    ],
    docs: ["atribut"],
    steps: [
      "Cek ketentuan pakaian dan atribut pada PDF. Tandai yang sesuai dengan kegiatanmu.",
      "Buat daftar barang yang perlu dibawa. Siapkan sesuai ketentuan dan pisahkan yang masih perlu dilengkapi.",
      "Cek ulang isi tas dan kelengkapan atribut sehari sebelum kegiatan.",
    ],
    done: "Pakaian, atribut, dan barang bawaan sudah dicocokkan dengan ketentuan.",
  },
  {
    id: "kurikulum",
    name: "Kenali kurikulum prodimu",
    intro:
      "Buka pedoman prodimu untuk tahu gambaran perkuliahan dan mata kuliah di awal studi.",
    keys: ["kurikulum", "pedoman prodi", "mata kuliah semester pertama"],
    docs: [
      "kurikulum-tif",
      "kurikulum-tkom",
      "kurikulum-si",
      "kurikulum-ti",
      "panduan-pti",
    ],
    steps: [
      "Pilih PDF sesuai prodi di bawah, lalu cek tahun dan versi yang berlaku untuk angkatanmu.",
      "Temukan bagian struktur kurikulum. Catat nama dan jumlah SKS mata kuliah semester awal yang tertera.",
      "Jika pedoman yang tersedia berbeda dari ketentuan angkatanmu, catat bagian yang perlu dikonfirmasi ke dosen PA.",
    ],
    done: "Kamu sudah menemukan pedoman prodimu dan tahu bagian yang menjelaskan rencana studi semester awal.",
  },
  {
    id: "krs",
    name: "Periksa KRS semester pertama",
    intro:
      "KRS (Kartu Rencana Studi) mencatat mata kuliah yang diambil pada satu semester. Mekanismenya bisa berbeda antarangkatan.",
    keys: [
      "krs",
      "kartu rencana studi",
      "paket",
      "enroll",
      "mata kuliah",
      "sks",
    ],
    docs: ["siam"],
    steps: [
      "Lihat apakah daftar mata kuliah semester pertama sudah dipaketkan untuk angkatanmu.",
      "Periksa nama mata kuliah, kelas, jumlah SKS, dan jadwal setiap mata kuliah yang muncul.",
      "Kalau ada instruksi memilih atau enroll, ikuti mekanisme angkatanmu. Bila tombol Enroll tersedia, cek baris mata kuliah yang perlu dikonfirmasi.",
      "Kalau kelas belum muncul, bentrok, atau belum tervalidasi, catat nama mata kuliah dan kode kelas sebelum bertanya ke dosen PA.",
    ],
    done: "Kamu tahu mekanisme angkatanmu dan sudah memeriksa daftar mata kuliah serta status KRS.",
  },
  {
    id: "pa",
    name: "Kenali dosen PA",
    intro:
      "Dosen Penasihat Akademik atau dosen wali membantu membahas rencana studi dan kendala akademikmu.",
    keys: ["dosen pa", "dosen wali", "penasihat akademik", "wali", "validasi"],
    steps: [
      "Catat nama dosen PA dari akun akademikmu. Gunakan informasi itu saat pertama kali menyiapkan konsultasi.",
      "Siapkan NIM, prodi, semester, dan pertanyaan spesifik. Contohnya “Satu mata kuliah paket belum muncul di KRS saya.”",
      "Setelah konsultasi, catat langkah berikutnya dan cek ulang status KRS jika kendalanya berkaitan dengan kelas atau validasi.",
    ],
    done: "Kamu tahu siapa dosen PA-mu dan sudah menyiapkan hal yang perlu dibahas jika ada kendala.",
  },
  {
    id: "jadwal",
    name: "Catat jadwal dan lokasi kelas",
    intro:
      "Bedakan jadwal kelas mingguan, periode ujian, dan tenggat administrasi agar catatanmu mudah dipakai.",
    keys: [
      "jadwal",
      "ruang",
      "lokasi kelas",
      "uts",
      "uas",
      "kalender",
      "hari pertama",
      "kode ruang",
    ],
    steps: [
      "Salin nama mata kuliah, kelas, hari, jam, dan kode ruang. Contoh format: Pemrograman Dasar · Kelas A · Senin 08.00 · Ruang Contoh.",
      "Pisahkan awal perkuliahan, masa perubahan KRS, dan periode UTS/UAS. Periode ujian memberi rentang umum. Jam ujian per mata kuliah bisa diumumkan terpisah.",
      "Cek ulang jadwal sebelum pertemuan pertama. Jika ada kelas bentrok, catat nama dan kode kedua kelas sebelum menanyakannya.",
    ],
    done: "Kamu sudah mencatat waktu dan ruang kelas pertama serta tenggat yang diketahui.",
  },
]
