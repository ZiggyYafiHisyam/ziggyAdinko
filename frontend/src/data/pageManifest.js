/* ============================================================================
   Editable content manifest.

   Every editable text / image on the public site is registered here with its
   built-in default. The admin "Editor Halaman" screen renders this structure
   (page -> section -> field). Public components read values with
   useContent(pageId).c('section.key') which returns the saved override, or the
   default below when nothing is overridden.

   Field types: 'text' | 'textarea' | 'image' | 'url'
   ============================================================================ */

const HERO_IMG = 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1800&q=80';

export const pageManifest = {
  /* -------------------------------------------------------- GLOBAL / SHARED */
  global: {
    label: 'Global (Navbar, Footer, Kontak)',
    sections: [
      {
        id: 'brand', label: 'Identitas Brand', fields: [
          { key: 'brand.name', label: 'Nama brand', type: 'text', default: 'Adinko x GhaziSportsHub' },
          { key: 'brand.tagline', label: 'Tagline', type: 'textarea', default: 'Penyedia solusi rumput sintetis dan fasilitas olahraga profesional terbaik di Pekanbaru & Riau. Dipercaya oleh 1000+ klien.' },
          { key: 'brand.since', label: 'Teks "sejak"', type: 'text', default: 'Pekanbaru Sejak 2019' },
        ]
      },
      {
        id: 'contacts', label: 'Info Kontak', fields: [
          { key: 'contacts.address', label: 'Alamat kantor', type: 'textarea', default: 'Jl. Todak No.113 Tangkerang Barat, Kec. Marpoyan Damai, Kota Pekanbaru, Riau' },
          { key: 'contacts.waAdinko', label: 'WhatsApp Adinko 1', type: 'text', default: '0852-6445-6566' },
          { key: 'contacts.waAdinko2', label: 'WhatsApp Adinko 2', type: 'text', default: '0813-9094-1740' },
          { key: 'contacts.waGhazi', label: 'WhatsApp GhaziSportsHub', type: 'text', default: '0852-6445-6566' },
          { key: 'contacts.igAdinko', label: 'Instagram Adinko', type: 'text', default: '@adinko.pekanbaru' },
          { key: 'contacts.igGhazi', label: 'Instagram GhaziSportsHub', type: 'text', default: '@ghazisportshub' },
          { key: 'contacts.mapsUrl', label: 'Link Google Maps', type: 'url', default: 'https://maps.google.com/?q=Jl.+Todak+No.113+Tangkerang+Barat+Pekanbaru' },
          { key: 'contacts.mapsEmbed', label: 'URL embed peta (iframe src)', type: 'url', default: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15958.826554559868!2d101.442!3d0.485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d5a92a543e371b%3A0x6b405553e1a0b!2sTangkerang%20Barat%2C%20Pekanbaru!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid' },
          { key: 'contacts.directWa', label: 'Nomor WA utama (format 62...)', type: 'text', default: '6285264456566' },
          { key: 'contacts.googleReviewUrl', label: 'Link tulis ulasan Google', type: 'url', default: 'https://search.google.com/local/writereview?placeid=ChIJWe2SmH6v1TER4QZMUcf2Tcw' },
        ]
      },
      {
        id: 'navbar', label: 'Navbar', fields: [
          { key: 'navbar.cta', label: 'Teks tombol CTA', type: 'text', default: 'Konsultasi' },
          { key: 'navbar.menuTentang', label: 'Menu "Tentang"', type: 'text', default: 'Tentang' },
          { key: 'navbar.menuTentangAdinko', label: 'Submenu Tentang Adinko', type: 'text', default: 'Tentang Adinko' },
          { key: 'navbar.menuTentangGhazi', label: 'Submenu Tentang Ghazi', type: 'text', default: 'Tentang GhaziSportsHub' },
          { key: 'navbar.menuLayanan', label: 'Menu Layanan', type: 'text', default: 'Layanan' },
          { key: 'navbar.menuPortofolio', label: 'Menu Portofolio', type: 'text', default: 'Portofolio' },
          { key: 'navbar.menuTestimoni', label: 'Menu Testimoni', type: 'text', default: 'Testimoni' },
          { key: 'navbar.menuKontak', label: 'Menu Kontak', type: 'text', default: 'Kontak' },
        ]
      },
      {
        id: 'floating', label: 'Badge Melayang (WhatsApp)', fields: [
          { key: 'floating.slotBadge', label: 'Teks badge kuning', type: 'text', default: 'Slot terbatas - Pesan sekarang!' },
        ]
      },
      {
        id: 'footer', label: 'Footer', fields: [
          { key: 'footer.brandHeading', label: 'Judul brand', type: 'text', default: 'Adinko × GhaziSportsHub' },
          { key: 'footer.desc', label: 'Deskripsi', type: 'textarea', default: 'Penyedia solusi rumput sintetis dan fasilitas olahraga profesional terbaik di Pekanbaru & Riau.' },
          { key: 'footer.descNote', label: 'Baris kedua deskripsi', type: 'text', default: 'Dipercaya oleh 1000+ klien.' },
          { key: 'footer.facebookUrl', label: 'Link Facebook', type: 'url', default: 'https://facebook.com' },
          { key: 'footer.youtubeUrl', label: 'Link YouTube', type: 'url', default: 'https://youtube.com' },
          { key: 'footer.instagramUrl', label: 'Link Instagram', type: 'url', default: 'https://instagram.com/adinko.pekanbaru' },
          { key: 'footer.col1Title', label: 'Kolom 1 - judul', type: 'text', default: 'PERUSAHAAN' },
          { key: 'footer.col1Link1', label: 'Kolom 1 - link 1', type: 'text', default: 'Tentang Kami' },
          { key: 'footer.col1Link2', label: 'Kolom 1 - link 2', type: 'text', default: 'Portofolio' },
          { key: 'footer.col1Link3', label: 'Kolom 1 - link 3', type: 'text', default: 'Testimoni' },
          { key: 'footer.col1Link4', label: 'Kolom 1 - link 4', type: 'text', default: 'Kontak' },
          { key: 'footer.col2Title', label: 'Kolom 2 - judul', type: 'text', default: 'ADINKO' },
          { key: 'footer.col2Link1', label: 'Kolom 2 - link 1', type: 'text', default: 'Rumput Sintetis' },
          { key: 'footer.col2Link2', label: 'Kolom 2 - link 2', type: 'text', default: 'Vertical Garden' },
          { key: 'footer.col2Link3', label: 'Kolom 2 - link 3', type: 'text', default: 'Taman Custom' },
          { key: 'footer.col2Link4', label: 'Kolom 2 - link 4', type: 'text', default: 'Bean Bag' },
          { key: 'footer.col3Title', label: 'Kolom 3 - judul', type: 'text', default: 'GhaziSportsHub' },
          { key: 'footer.col3Link1', label: 'Kolom 3 - link 1', type: 'text', default: 'Lapangan Futsal' },
          { key: 'footer.col3Link2', label: 'Kolom 3 - link 2', type: 'text', default: 'Minisoccer' },
          { key: 'footer.col3Link3', label: 'Kolom 3 - link 3', type: 'text', default: 'Padel & Tenis' },
          { key: 'footer.col3Link4', label: 'Kolom 3 - link 4', type: 'text', default: 'Jogging Track' },
          { key: 'footer.copyright', label: 'Teks copyright', type: 'text', default: '© 2026 Metro Software Indonesia. All rights reserved. Padang, Indonesia' },
        ]
      },
    ]
  },

  /* -------------------------------------------------------------------- HOME */
  home: {
    label: 'Beranda',
    sections: [
      {
        id: 'hero', label: 'Hero / Banner Atas', fields: [
          { key: 'hero.bg', label: 'Gambar latar', type: 'image', default: HERO_IMG },
          { key: 'hero.tag', label: 'Badge kecil', type: 'text', default: 'Pekanbaru Sejak 2019' },
          { key: 'hero.title', label: 'Judul utama', type: 'textarea', default: 'Jasa Rumput Sintetis & Lapangan Olahraga Profesional Pekanbaru' },
          { key: 'hero.subtitle', label: 'Sub-judul', type: 'textarea', default: 'Rumput sintetis berkualitas tinggi untuk kebutuhan taman & lapangan olahraga profesional Pekanbaru & Riau.' },
          { key: 'hero.btnPrimary', label: 'Tombol 1', type: 'text', default: 'Konsultasi Gratis' },
          { key: 'hero.btnSecondary', label: 'Tombol 2', type: 'text', default: 'Lihat Portofolio' },
        ]
      },
      {
        id: 'stats', label: 'Bar Statistik', fields: [
          { key: 'stats.1value', label: 'Statistik 1 - nilai', type: 'text', default: '500+' },
          { key: 'stats.1label', label: 'Statistik 1 - label', type: 'text', default: 'Proyek Selesai' },
          { key: 'stats.2value', label: 'Statistik 2 - nilai', type: 'text', default: '8+' },
          { key: 'stats.2label', label: 'Statistik 2 - label', type: 'text', default: 'Tahun Pengalaman' },
          { key: 'stats.3value', label: 'Statistik 3 - nilai', type: 'text', default: 'Premium' },
          { key: 'stats.3label', label: 'Statistik 3 - label', type: 'text', default: 'Kualitas Terbaik' },
          { key: 'stats.4value', label: 'Statistik 4 - nilai', type: 'text', default: 'Garansi' },
          { key: 'stats.4label', label: 'Statistik 4 - label', type: 'text', default: 'Kepuasan Terjamin' },
        ]
      },
      {
        id: 'dual', label: 'Dua Brand', fields: [
          { key: 'dual.tag', label: 'Tag', type: 'text', default: 'DUA BRAND KAMI' },
          { key: 'dual.title', label: 'Judul', type: 'textarea', default: 'Dua Brand, Satu Komitmen: Kualitas Terbaik' },
          { key: 'dual.subtitle', label: 'Deskripsi', type: 'textarea', default: 'Kami menghadirkan kolaborasi terpadu antara Adinko (spesialis rumput sintetis taman & lanskap hunian) serta GhaziSportsHub (kontraktor fasilitas lapangan olahraga berstandar profesional).' },
          { key: 'dual.btn', label: 'Tombol', type: 'text', default: 'Lihat Selengkapnya' },
          { key: 'dual.card1img', label: 'Kartu 1 - gambar', type: 'image', default: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=700&q=80' },
          { key: 'dual.card1title', label: 'Kartu 1 - judul', type: 'text', default: 'Rumput Sintetis' },
          { key: 'dual.card1text', label: 'Kartu 1 - teks', type: 'text', default: 'Taman & lanskap hunian elegan ramah anak' },
          { key: 'dual.card2img', label: 'Kartu 2 - gambar', type: 'image', default: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=700&q=80' },
          { key: 'dual.card2title', label: 'Kartu 2 - judul', type: 'text', default: 'Lapangan Olahraga' },
          { key: 'dual.card2text', label: 'Kartu 2 - teks', type: 'text', default: 'Mini soccer, futsal, padel & jaring pengaman' },
        ]
      },
      {
        id: 'features', label: 'Keunggulan Kami', fields: [
          { key: 'features.tag', label: 'Tag', type: 'text', default: 'KEUNGGULAN KAMI' },
          { key: 'features.title', label: 'Judul', type: 'text', default: 'Solusi Tepat untuk Hunian Anda' },
          { key: 'features.subtitle', label: 'Deskripsi', type: 'textarea', default: 'Kualitas pengerjaan presisi dengan jaminan kepuasan dan transparansi harga untuk setiap proyek Anda.' },
          { key: 'features.btn', label: 'Tombol', type: 'text', default: 'Konsultasi GRATIS Sekarang' },
          { key: 'features.c1title', label: 'Kartu 001 - judul', type: 'text', default: 'Hasil Presisi' },
          { key: 'features.c1desc', label: 'Kartu 001 - teks', type: 'text', default: 'Pemasangan rapi ditangani tim ahli untuk hasil maksimal.' },
          { key: 'features.c1img', label: 'Kartu 001 - gambar', type: 'image', default: 'https://images.unsplash.com/photo-1558904541-efa8c4a08931?auto=format&fit=crop&w=800&q=80' },
          { key: 'features.c2title', label: 'Kartu 002 - judul', type: 'text', default: 'Custom Desain' },
          { key: 'features.c2desc', label: 'Kartu 002 - teks', type: 'text', default: 'Personalisasi desain sesuai dengan keinginan dan kebutuhan Anda.' },
          { key: 'features.c2img', label: 'Kartu 002 - gambar', type: 'image', default: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=800&q=80' },
          { key: 'features.c3title', label: 'Kartu 003 - judul', type: 'text', default: 'Harga Jujur' },
          { key: 'features.c3desc', label: 'Kartu 003 - teks', type: 'text', default: 'Transparansi total sejak awal tanpa ada biaya tersembunyi.' },
          { key: 'features.c3img', label: 'Kartu 003 - gambar', type: 'image', default: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80' },
          { key: 'features.c4title', label: 'Kartu 004 - judul', type: 'text', default: 'After Sales' },
          { key: 'features.c4desc', label: 'Kartu 004 - teks', type: 'text', default: 'Dukungan penuh dan garansi setelah proses pengerjaan selesai.' },
          { key: 'features.c4img', label: 'Kartu 004 - gambar', type: 'image', default: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80' },
        ]
      },
      {
        id: 'portfolio', label: 'Bagian Portofolio', fields: [
          { key: 'portfolio.tag', label: 'Tag', type: 'text', default: 'PORTOFOLIO' },
          { key: 'portfolio.title', label: 'Judul', type: 'text', default: 'Hasil Pekerjaan Kami' },
          { key: 'portfolio.subtitle', label: 'Deskripsi', type: 'textarea', default: 'Dokumentasi nyata instalasi rumput sintetis dan lapangan olahraga terbaik di Pekanbaru.' },
          { key: 'portfolio.btn', label: 'Tombol', type: 'text', default: 'Lihat lebih banyak proyek' },
        ]
      },
      {
        id: 'testi', label: 'Bagian Testimoni', fields: [
          { key: 'testi.tag', label: 'Tag', type: 'text', default: 'TESTIMONI KLIEN' },
          { key: 'testi.title', label: 'Judul', type: 'text', default: 'Apa Kata Klien Kami?' },
          { key: 'testi.subtitle', label: 'Deskripsi', type: 'text', default: 'dari Google Review & Pelanggan Setia' },
          { key: 'testi.btn', label: 'Tombol', type: 'text', default: 'Lihat Semua Testimoni' },
        ]
      },
      {
        id: 'contact', label: 'Bagian Kontak', fields: [
          { key: 'contact.tag', label: 'Tag', type: 'text', default: 'CONTACT' },
          { key: 'contact.title', label: 'Judul', type: 'text', default: 'Hubungi Kami' },
          { key: 'contact.btn', label: 'Tombol peta', type: 'text', default: 'Petunjuk Arah Google Maps' },
          { key: 'contact.formTitle', label: 'Judul form', type: 'text', default: 'Kirim Pesan ke Kami' },
        ]
      },
      {
        id: 'bottom', label: 'Banner Bawah', fields: [
          { key: 'bottom.text', label: 'Teks', type: 'textarea', default: 'Jangan tunda lagi wujudkan taman atau lapangan impian Anda bersama kami sekarang!' },
        ]
      },
    ]
  },

  /* ----------------------------------------------------------------- LAYANAN */
  layanan: {
    label: 'Layanan',
    sections: [
      {
        id: 'hero', label: 'Hero', fields: [
          { key: 'hero.bg', label: 'Gambar latar', type: 'image', default: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1800&q=80' },
          { key: 'hero.tag', label: 'Badge kecil', type: 'text', default: 'Layanan Kami' },
          { key: 'hero.title', label: 'Judul', type: 'textarea', default: 'Solusi Lengkap Rumput Sintetis & Lapangan Olahraga' },
          { key: 'hero.subtitle', label: 'Sub-judul', type: 'textarea', default: 'Kami hadir sebagai mitra terpercaya untuk kebutuhan taman sintetis maupun fasilitas olahraga profesional Anda.' },
        ]
      },
      {
        id: 'adinko', label: 'Blok Adinko', fields: [
          { key: 'adinko.brand', label: 'Brand', type: 'text', default: 'ADINKO' },
          { key: 'adinko.title', label: 'Judul', type: 'text', default: 'Rumput Sintetis & Taman' },
          { key: 'adinko.desc', label: 'Deskripsi', type: 'textarea', default: 'Untuk taman rumah, kantor, area komersial, vertical garden, hingga instalasi mini golf. Material premium, pemasangan presisi, bebas perawatan intensif.' },
          { key: 'adinko.tags', label: 'Tag (pisahkan dengan koma)', type: 'text', default: 'Rumput Sintetis, Vertical Garden, Taman Custom, Mini Golf' },
        ]
      },
      {
        id: 'ghazi', label: 'Blok GhaziSportsHub', fields: [
          { key: 'ghazi.brand', label: 'Brand', type: 'text', default: 'GhaziSportsHub' },
          { key: 'ghazi.title', label: 'Judul', type: 'text', default: 'Lapangan Olahraga' },
          { key: 'ghazi.desc', label: 'Deskripsi', type: 'textarea', default: 'Pembangunan lapangan olahraga profesional: futsal, minisoccer, padel, basket, tenis, badminton, jogging track, driving golf cage, instalasi jaring, dan lainnya.' },
          { key: 'ghazi.tags', label: 'Tag (pisahkan dengan koma)', type: 'text', default: 'Futsal & Minisoccer, Padel & Tenis, Basket & Voli, Instalasi Jaring' },
        ]
      },
      {
        id: 'grid', label: 'Bagian Grid Layanan', fields: [
          { key: 'grid.tag', label: 'Tag', type: 'text', default: 'LAYANAN KAMI' },
          { key: 'grid.title', label: 'Judul', type: 'text', default: 'Satu Solusi untuk Semua Kebutuhan Anda' },
          { key: 'grid.subtitle', label: 'Deskripsi', type: 'textarea', default: 'Dari pemasangan rumput sintetis hingga pembangunan lapangan olahraga, kami menghadirkan layanan lengkap.' },
          { key: 'grid.btn', label: 'Tombol', type: 'text', default: 'Konsultasi GRATIS Sekarang' },
        ]
      },
    ]
  },

  /* -------------------------------------------------------------- PORTOFOLIO */
  portofolio: {
    label: 'Portofolio',
    sections: [
      {
        id: 'hero', label: 'Hero', fields: [
          { key: 'hero.bg', label: 'Gambar latar', type: 'image', default: 'https://images.unsplash.com/photo-1558904541-efa8c4a08931?auto=format&fit=crop&w=1800&q=80' },
          { key: 'hero.tag', label: 'Badge kecil', type: 'text', default: 'Hasil Nyata, Klien Puas' },
          { key: 'hero.title', label: 'Judul', type: 'text', default: 'Hasil Pekerjaan Kami' },
          { key: 'hero.subtitle', label: 'Sub-judul', type: 'textarea', default: 'Kami telah mengerjakan berbagai proyek dengan hasil memuaskan dari skala rumahan hingga komersial besar. Setiap proyek adalah bukti komitmen kami.' },
        ]
      },
      {
        id: 'grid', label: 'Grid Proyek', fields: [
          { key: 'grid.btn', label: 'Tombol bawah', type: 'text', default: 'Lihat lebih banyak proyek' },
          { key: 'grid.note', label: 'Catatan', type: 'text', default: 'Daftar proyek dikelola di menu "Portofolio Proyek".' },
        ]
      },
    ]
  },

  /* --------------------------------------------------------------- TESTIMONI */
  testimoni: {
    label: 'Testimoni',
    sections: [
      {
        id: 'hero', label: 'Hero', fields: [
          { key: 'hero.bg', label: 'Gambar latar', type: 'image', default: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1800&q=80' },
          { key: 'hero.tag', label: 'Badge kecil', type: 'text', default: 'Kepuasan Klien adalah Prioritas Kami' },
          { key: 'hero.title', label: 'Judul', type: 'text', default: 'Apa Kata Klien Kami?' },
          { key: 'hero.subtitle', label: 'Sub-judul', type: 'textarea', default: 'Berikut testimoni dari klien yang telah mempercayakan proyek mereka kepada kami. Hasil nyata, klien puas.' },
        ]
      },
      {
        id: 'gmaps', label: 'Ajakan Ulasan Google', fields: [
          { key: 'gmaps.title', label: 'Judul', type: 'text', default: 'Puas dengan hasil kerja kami?' },
          { key: 'gmaps.body', label: 'Deskripsi', type: 'textarea', default: 'Bagikan pengalaman Anda di Google Maps. Ulasan Anda membantu calon pelanggan lain di Pekanbaru menemukan dan mempercayai Adinko Rumput Sintetis.' },
          { key: 'gmaps.btn', label: 'Tombol', type: 'text', default: 'Leave us a review on GMaps!' },
        ]
      },
      {
        id: 'grid', label: 'Grid Testimoni', fields: [
          { key: 'grid.btn', label: 'Tombol bawah', type: 'text', default: 'Lihat lebih banyak proyek' },
        ]
      },
    ]
  },

  /* ------------------------------------------------------------------ KONTAK */
  kontak: {
    label: 'Kontak',
    sections: [
      {
        id: 'hero', label: 'Hero', fields: [
          { key: 'hero.bg', label: 'Gambar latar', type: 'image', default: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1800&q=80' },
          { key: 'hero.tag', label: 'Badge kecil', type: 'text', default: 'Respons dalam 1 Jam' },
          { key: 'hero.title', label: 'Judul', type: 'text', default: 'Hubungi Kami Kami Siap Membantu!' },
          { key: 'hero.subtitle', label: 'Sub-judul', type: 'textarea', default: 'Konsultasikan kebutuhan Anda sekarang juga. Tim kami siap membantu dari survei awal, perencanaan, pengerjaan, hingga purna jual.' },
        ]
      },
      {
        id: 'details', label: 'Detail Kontak', fields: [
          { key: 'details.tag', label: 'Tag', type: 'text', default: 'CONTACT' },
          { key: 'details.heading', label: 'Judul (fallback)', type: 'text', default: 'Hubungi Kami' },
          { key: 'details.btn', label: 'Tombol', type: 'text', default: 'Konsultasi GRATIS Sekarang' },
          { key: 'details.formTitle', label: 'Judul form', type: 'text', default: 'Kirim Pesan Sekarang' },
        ]
      },
    ]
  },

  /* ------------------------------------------------------------ ABOUT ADINKO */
  'about-adinko': {
    label: 'Tentang Adinko',
    sections: [
      {
        id: 'hero', label: 'Hero', fields: [
          { key: 'hero.bg', label: 'Gambar latar', type: 'image', default: 'https://images.unsplash.com/photo-1558904541-efa8c4a08931?auto=format&fit=crop&w=1800&q=80' },
          { key: 'hero.tag', label: 'Badge kecil', type: 'text', default: 'Tentang Adinko' },
          { key: 'hero.title', label: 'Judul', type: 'textarea', default: 'Solusi Rumput Sintetis Berkualitas untuk Berbagai Kebutuhan' },
          { key: 'hero.subtitle', label: 'Sub-judul', type: 'textarea', default: 'Adinko hadir sebagai mitra terpercaya untuk kebutuhan rumput sintetis berkualitas di Pekanbaru dan Riau.' },
        ]
      },
      {
        id: 'who', label: 'Siapa Kami', fields: [
          { key: 'who.tag', label: 'Tag', type: 'text', default: 'SIAPA KAMI' },
          { key: 'who.title', label: 'Judul', type: 'textarea', default: 'Berpengalaman dalam Pemasangan Rumput Sintetis Profesional' },
          { key: 'who.body', label: 'Deskripsi', type: 'textarea', default: 'Adinko adalah penyedia jasa rumput sintetis di Pekanbaru yang telah dipercaya oleh berbagai klien. Fokus pada kualitas material, kerapian pengerjaan, dan hasil akhir yang estetik serta tahan lama.' },
          { key: 'who.btn1', label: 'Tombol 1', type: 'text', default: 'Hubungi Kami' },
          { key: 'who.btn2', label: 'Tombol 2', type: 'text', default: 'Sertifikasi & Garansi Dimensi' },
          { key: 'who.slide1', label: 'Slider gambar 1', type: 'image', default: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=800&q=80' },
          { key: 'who.slide2', label: 'Slider gambar 2', type: 'image', default: 'https://images.unsplash.com/photo-1558904541-efa8c4a08931?auto=format&fit=crop&w=800&q=80' },
          { key: 'who.slide3', label: 'Slider gambar 3', type: 'image', default: 'https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=800&q=80' },
        ]
      },
      {
        id: 'vm', label: 'Visi & Misi', fields: [
          { key: 'vm.tag', label: 'Tag', type: 'text', default: 'VISI & MISI' },
          { key: 'vm.title', label: 'Judul', type: 'textarea', default: 'Tumbuh Menjadi Penyedia Terpercaya di Pekanbaru' },
          { key: 'vm.subtitle', label: 'Deskripsi', type: 'textarea', default: 'Kami berkomitmen memberikan layanan terbaik untuk kualitas produk, kerapian pengerjaan, dan kepuasan pelanggan.' },
          { key: 'vm.image', label: 'Gambar', type: 'image', default: 'https://images.unsplash.com/photo-1558904541-efa8c4a08931?auto=format&fit=crop&w=800&q=80' },
          { key: 'vm.valuesLabel', label: 'Label "Nilai Kami"', type: 'text', default: 'Nilai Kami' },
          { key: 'vm.values', label: 'Nilai (pisahkan koma)', type: 'text', default: 'Kualitas, Kerapian, Profesionalitas' },
          { key: 'vm.visiTitle', label: 'Judul Visi', type: 'text', default: 'Visi Kami' },
          { key: 'vm.visiBody', label: 'Isi Visi', type: 'textarea', default: 'Menjadi penyedia rumput sintetis terbaik dan terdepan sekaligus inovatif di Riau dan sekitarnya.' },
          { key: 'vm.misiTitle', label: 'Judul Misi', type: 'text', default: 'Misi Kami' },
          { key: 'vm.misi1', label: 'Misi 1', type: 'text', default: 'Memberikan produk rumput sintetis unggul dengan standar keamanan tinggi' },
          { key: 'vm.misi2', label: 'Misi 2', type: 'text', default: 'Pelayanan profesional' },
          { key: 'vm.misi3', label: 'Misi 3', type: 'text', default: 'Harga kompetitif' },
          { key: 'vm.misi4', label: 'Misi 4', type: 'text', default: 'Pengerjaan tepat waktu' },
        ]
      },
      {
        id: 'focus', label: 'Fokus Keunggulan', fields: [
          { key: 'focus.tag', label: 'Tag', type: 'text', default: 'FOKUS KEUNGGULAN' },
          { key: 'focus.title', label: 'Judul', type: 'text', default: 'Kami Mengutamakan Kualitas di Setiap Detail' },
          { key: 'focus.c1title', label: 'Kartu 001 - judul', type: 'text', default: 'Standar Lapangan Profesional' },
          { key: 'focus.c1desc', label: 'Kartu 001 - teks', type: 'text', default: 'Kualitas material berstandar tinggi yang tahan cuaca tropis ekstrem.' },
          { key: 'focus.c2title', label: 'Kartu 002 - judul', type: 'text', default: 'Pemasangan Rapi & Presisi' },
          { key: 'focus.c2desc', label: 'Kartu 002 - teks', type: 'text', default: 'Dikerjakan oleh teknisi ahli berpengalaman dengan kerapian sambungan maksimal.' },
          { key: 'focus.c3title', label: 'Kartu 003 - judul', type: 'text', default: 'Dilengkapi Sistem Drainase & Perawatan Mudah' },
          { key: 'focus.c3desc', label: 'Kartu 003 - teks', type: 'text', default: 'Lapisan drainase cepat kering sehingga bebas becek dan mudah dibersihkan.' },
          { key: 'focus.c4title', label: 'Kartu 004 - judul', type: 'text', default: 'Harga Transparan Tanpa Biaya Tersembunyi' },
          { key: 'focus.c4desc', label: 'Kartu 004 - teks', type: 'text', default: 'Estimasi RAB jelas dan terperinci sejak survei lokasi pertama.' },
        ]
      },
      {
        id: 'sol', label: 'Solusi / Produk', fields: [
          { key: 'sol.tag', label: 'Tag', type: 'text', default: 'PRODUK & LAYANAN' },
          { key: 'sol.title', label: 'Judul', type: 'text', default: 'Solusi Rumput Sintetis untuk Berbagai Kebutuhan' },
          { key: 'sol.subtitle', label: 'Deskripsi', type: 'textarea', default: 'Kebutuhan rumput sintetis hunian maupun komersial dengan fleksibilitas pemasangan di segala medan.' },
          { key: 'sol.btn', label: 'Tombol', type: 'text', default: 'KONSULTASI GRATIS SEKARANG' },
          { key: 'sol.c1title', label: 'Kartu 1 - judul', type: 'text', default: 'Taman rumah' },
          { key: 'sol.c1img', label: 'Kartu 1 - gambar', type: 'image', default: 'https://images.unsplash.com/photo-1558904541-efa8c4a08931?auto=format&fit=crop&w=600&q=80' },
          { key: 'sol.c2title', label: 'Kartu 2 - judul', type: 'text', default: 'Dekorasi indoor & outdoor' },
          { key: 'sol.c2img', label: 'Kartu 2 - gambar', type: 'image', default: 'https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=600&q=80' },
          { key: 'sol.c3title', label: 'Kartu 3 - judul', type: 'text', default: 'Area komersial (cafe, kantor, dll)' },
          { key: 'sol.c3img', label: 'Kartu 3 - gambar', type: 'image', default: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80' },
          { key: 'sol.c4title', label: 'Kartu 4 - judul', type: 'text', default: 'Vertical garden' },
          { key: 'sol.c4img', label: 'Kartu 4 - gambar', type: 'image', default: 'https://images.unsplash.com/photo-1534710961216-75c88202f43e?auto=format&fit=crop&w=600&q=80' },
        ]
      },
      {
        id: 'cta', label: 'Banner CTA Bawah', fields: [
          { key: 'cta.tag', label: 'Tag', type: 'text', default: 'KITA SEKARANG' },
          { key: 'cta.title', label: 'Judul', type: 'text', default: 'Tertarik? Mari Diskusikan Proyek Anda' },
          { key: 'cta.body', label: 'Deskripsi', type: 'textarea', default: 'Tentukan kebutuhan rumput sintetis impian Anda bersama tim spesialis kami.' },
          { key: 'cta.btn', label: 'Tombol', type: 'text', default: 'Gabung bersama kami' },
        ]
      },
    ]
  },

  /* ------------------------------------------------------------- ABOUT GHAZI */
  'about-ghazi': {
    label: 'Tentang GhaziSportsHub',
    sections: [
      {
        id: 'hero', label: 'Hero', fields: [
          { key: 'hero.bg', label: 'Gambar latar', type: 'image', default: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=1800&q=80' },
          { key: 'hero.tag', label: 'Badge kecil', type: 'text', default: 'Tentang Ghazi SportsHub' },
          { key: 'hero.title', label: 'Judul', type: 'textarea', default: 'Spesialis Pembangunan Lapangan Olahraga Profesional' },
          { key: 'hero.subtitle', label: 'Sub-judul', type: 'textarea', default: 'Kami menghadirkan pembangunan lapangan olahraga berstandar tinggi dengan material berkualitas untuk performa maksimal atlet dan kepuasan komunitas.' },
        ]
      },
      {
        id: 'who', label: 'Siapa Kami', fields: [
          { key: 'who.tag', label: 'Tag', type: 'text', default: 'SIAPA KAMI' },
          { key: 'who.title', label: 'Judul', type: 'textarea', default: 'Unit Khusus untuk Pembangunan Fasilitas Olahraga' },
          { key: 'who.body', label: 'Deskripsi', type: 'textarea', default: 'GhaziSportsHub merupakan unit pengembangan dari Adinko yang fokus pada pembangunan lapangan olahraga seperti Mini Soccer, Futsal, hingga Tenis dengan fasilitas terbaik.' },
          { key: 'who.tags', label: 'Tag (pisahkan koma)', type: 'text', default: 'Mini Soccer, Futsal Arena, Tenis' },
          { key: 'who.slide1', label: 'Slider gambar 1', type: 'image', default: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=800&q=80' },
          { key: 'who.slide2', label: 'Slider gambar 2', type: 'image', default: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80' },
          { key: 'who.slide3', label: 'Slider gambar 3', type: 'image', default: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80' },
        ]
      },
      {
        id: 'vm', label: 'Visi & Misi', fields: [
          { key: 'vm.tag', label: 'Tag', type: 'text', default: 'VISI & MISI' },
          { key: 'vm.title', label: 'Judul', type: 'textarea', default: 'Membangun Fasilitas Olahraga Berkualitas' },
          { key: 'vm.subtitle', label: 'Deskripsi', type: 'textarea', default: 'Kami berkomitmen memberikan layanan terbaik untuk kualitas produk, kepuasan pengerjaan, dan kepuasan pelanggan.' },
          { key: 'vm.image', label: 'Gambar', type: 'image', default: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80' },
          { key: 'vm.valuesLabel', label: 'Label "Nilai Kami"', type: 'text', default: 'Nilai Kami' },
          { key: 'vm.values', label: 'Nilai (pisahkan koma)', type: 'text', default: 'Kualitas, Ketahanan, Profesionalitas' },
          { key: 'vm.visiTitle', label: 'Judul Visi', type: 'text', default: 'Visi Kami' },
          { key: 'vm.visiBody', label: 'Isi Visi', type: 'textarea', default: 'Menjadi kontraktor pembangunan lapangan olahraga terpercaya dan terdepan di Riau dan sekitarnya.' },
          { key: 'vm.misiTitle', label: 'Judul Misi', type: 'text', default: 'Misi Kami' },
          { key: 'vm.misi1', label: 'Misi 1', type: 'text', default: 'Memberikan produk rumput sintetis unggul dengan standar keamanan tinggi' },
          { key: 'vm.misi2', label: 'Misi 2', type: 'text', default: 'Pelayanan profesional' },
          { key: 'vm.misi3', label: 'Misi 3', type: 'text', default: 'Harga kompetitif' },
          { key: 'vm.misi4', label: 'Misi 4', type: 'text', default: 'Pengerjaan tepat waktu' },
        ]
      },
      {
        id: 'focus', label: 'Fokus Keunggulan', fields: [
          { key: 'focus.tag', label: 'Tag', type: 'text', default: 'FOKUS KEUNGGULAN' },
          { key: 'focus.title', label: 'Judul', type: 'text', default: 'Kami Mengutamakan Kualitas di Setiap Detail' },
          { key: 'focus.c1title', label: 'Kartu 001 - judul', type: 'text', default: 'Standar Lapangan Profesional' },
          { key: 'focus.c1desc', label: 'Kartu 001 - teks', type: 'text', default: 'Konstruksi dan marking lapangan mengikuti standar resmi induk olahraga internasional.' },
          { key: 'focus.c2title', label: 'Kartu 002 - judul', type: 'text', default: 'Konstruksi Kuat & Kokoh' },
          { key: 'focus.c2desc', label: 'Kartu 002 - teks', type: 'text', default: 'Struktur pondasi, tiang, dan jaring pagar dirancang untuk pemakaian intensif jangka panjang.' },
          { key: 'focus.c3title', label: 'Kartu 003 - judul', type: 'text', default: 'Drainase & Ukuran Lapangan Presisi' },
          { key: 'focus.c3desc', label: 'Kartu 003 - teks', type: 'text', default: 'Sistem resapan air modern memastikan lapangan dapat segera digunakan pasca hujan lebat.' },
          { key: 'focus.c4title', label: 'Kartu 004 - judul', type: 'text', default: 'Dukungan Perawatan Pasca Selesai' },
          { key: 'focus.c4desc', label: 'Kartu 004 - teks', type: 'text', default: 'Layanan purna jual berkala untuk menjaga kualitas dan performa rumput tetap prima.' },
        ]
      },
      {
        id: 'sol', label: 'Fasilitas Olahraga', fields: [
          { key: 'sol.tag', label: 'Tag', type: 'text', default: 'FASILITAS OLAHRAGA' },
          { key: 'sol.title', label: 'Judul', type: 'text', default: 'Pembangunan Lapangan Sesuai Kebutuhan Anda' },
          { key: 'sol.subtitle', label: 'Deskripsi', type: 'textarea', default: 'Mulai dari futsal hingga mini soccer, kami menyediakan paket pengerjaan lengkap dari fondasi hingga jaring keliling.' },
          { key: 'sol.btn', label: 'Tombol', type: 'text', default: 'KONSULTASI GRATIS SEKARANG' },
          { key: 'sol.c1title', label: 'Kartu 1 - judul', type: 'text', default: 'Futsal' },
          { key: 'sol.c1img', label: 'Kartu 1 - gambar', type: 'image', default: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=600&q=80' },
          { key: 'sol.c2title', label: 'Kartu 2 - judul', type: 'text', default: 'Minisoccer' },
          { key: 'sol.c2img', label: 'Kartu 2 - gambar', type: 'image', default: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=600&q=80' },
          { key: 'sol.c3title', label: 'Kartu 3 - judul', type: 'text', default: 'Mini golf' },
          { key: 'sol.c3img', label: 'Kartu 3 - gambar', type: 'image', default: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=600&q=80' },
          { key: 'sol.c4title', label: 'Kartu 4 - judul', type: 'text', default: 'Area olahraga lainnya' },
          { key: 'sol.c4img', label: 'Kartu 4 - gambar', type: 'image', default: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80' },
        ]
      },
      {
        id: 'cta', label: 'Banner CTA Bawah', fields: [
          { key: 'cta.tag', label: 'Tag', type: 'text', default: 'KITA SEKARANG' },
          { key: 'cta.title', label: 'Judul', type: 'text', default: 'Bangun Lapangan Impian Anda Bersama Ghazi' },
          { key: 'cta.body', label: 'Deskripsi', type: 'textarea', default: 'Tentukan standar fasilitas olahraga impian Anda bersama tim ahli kami.' },
          { key: 'cta.btn', label: 'Tombol', type: 'text', default: 'Gabung bersama kami' },
        ]
      },
    ]
  },
};

/** Flat { 'page:key' -> default } lookup for fast default resolution. */
export const manifestDefaults = (() => {
  const out = {};
  for (const [pageId, page] of Object.entries(pageManifest)) {
    for (const section of page.sections) {
      for (const f of section.fields) {
        out[`${pageId}:${f.key}`] = f.default;
      }
    }
  }
  return out;
})();
