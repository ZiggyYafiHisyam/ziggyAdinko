const db = require('./database');
const { hashPassword } = require('../utils/security');

/**
 * Creates every table the app needs (idempotent) and seeds the default admin
 * account plus the single kontak settings row. Safe to run on every process
 * start / serverless cold start. This mirrors database.sql so the app also
 * works if that script was never run manually.
 */
const DDL = [
  `CREATE TABLE IF NOT EXISTS users (
     id_user INT AUTO_INCREMENT PRIMARY KEY,
     username VARCHAR(100) NOT NULL UNIQUE,
     password VARCHAR(255) NOT NULL,
     name VARCHAR(255) NOT NULL,
     role VARCHAR(50) DEFAULT 'admin',
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
   )`,
  `CREATE TABLE IF NOT EXISTS kontak (
     id_kontak INT AUTO_INCREMENT PRIMARY KEY,
     kontak_badge VARCHAR(100),
     kontak_title VARCHAR(255) NOT NULL,
     kontak_description TEXT,
     kontak_background_image TEXT,
     button_primary_text VARCHAR(100),
     button_primary_link VARCHAR(255),
     button_secondary_text VARCHAR(100),
     button_secondary_link VARCHAR(255),
     trust_projects VARCHAR(50),
     trust_expert VARCHAR(50),
     trust_material VARCHAR(50),
     trust_survey VARCHAR(50),
     about_preview_title VARCHAR(255),
     about_preview_description TEXT,
     about_preview_button_text VARCHAR(100),
     about_preview_button_link VARCHAR(255),
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
   )`,
  `CREATE TABLE IF NOT EXISTS home (
     id_home INT AUTO_INCREMENT PRIMARY KEY,
     title VARCHAR(255),
     subtitle VARCHAR(255),
     content TEXT,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
   )`,
  `CREATE TABLE IF NOT EXISTS about (
     id_about INT AUTO_INCREMENT PRIMARY KEY,
     title VARCHAR(255),
     content TEXT,
     image TEXT,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
   )`,
  `CREATE TABLE IF NOT EXISTS layanan (
     id_layanan INT AUTO_INCREMENT PRIMARY KEY,
     title VARCHAR(255),
     category VARCHAR(100),
     description TEXT,
     image TEXT,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
   )`,
  `CREATE TABLE IF NOT EXISTS portofolio (
     id_portofolio INT AUTO_INCREMENT PRIMARY KEY,
     title VARCHAR(255),
     category VARCHAR(100),
     location VARCHAR(255),
     description TEXT,
     image TEXT,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
   )`,
  `CREATE TABLE IF NOT EXISTS messages (
     id_message INT AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(255) NOT NULL,
     noWA VARCHAR(50) NOT NULL,
     location VARCHAR(255),
     kebutuhan VARCHAR(255) NOT NULL,
     details TEXT,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   )`,
  `CREATE TABLE IF NOT EXISTS testimoni (
     id_testimoni INT AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(255) NOT NULL,
     time_text VARCHAR(100),
     category VARCHAR(100),
     rating INT DEFAULT 5,
     avatar TEXT,
     text TEXT NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
   )`,
  `CREATE TABLE IF NOT EXISTS page_content (
     page VARCHAR(50) NOT NULL,
     ckey VARCHAR(150) NOT NULL,
     value TEXT,
     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
     PRIMARY KEY (page, ckey)
   )`
];

const seedAdmin = async () => {
  const [rows] = await db.execute('SELECT id_user FROM users WHERE username = ? LIMIT 1', ['admin']);
  if (rows.length === 0) {
    await db.execute(
      'INSERT INTO users (username, password, name, role) VALUES (?, ?, ?, ?)',
      ['admin', hashPassword('admin321'), 'Administrator Adinko', 'admin']
    );
    console.log('[bootstrap] Seeded default admin — username: admin / password: admin321 (change this).');
  }
};

const seedKontak = async () => {
  const [rows] = await db.execute('SELECT id_kontak FROM kontak WHERE id_kontak = 1 LIMIT 1');
  if (rows.length === 0) {
    await db.execute(
      `INSERT INTO kontak
        (id_kontak, kontak_title, kontak_description, button_primary_text, button_primary_link,
         button_secondary_text, button_secondary_link, trust_projects, trust_expert, trust_material, trust_survey)
       VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        'Hubungi Kami',
        'Konsultasikan kebutuhan Anda sekarang juga. Tim kami siap membantu dari survei awal hingga purna jual.',
        'Konsultasi Gratis via WhatsApp', '',
        'Petunjuk Arah Google Maps', '',
        '500+', '8+ Tahun', 'Premium', 'Gratis Survei'
      ]
    );
    console.log('[bootstrap] Seeded default kontak settings row.');
  }
};

let bootstrapPromise = null;

const bootstrap = () => {
  if (bootstrapPromise) return bootstrapPromise;
  bootstrapPromise = (async () => {
    try {
      for (const ddl of DDL) {
        await db.execute(ddl);
      }
      await seedAdmin();
      await seedKontak();
      console.log('[bootstrap] Database schema is ready.');
    } catch (err) {
      console.error('[bootstrap] Failed to prepare database:', err.message);
      bootstrapPromise = null; // allow a retry on the next request
      throw err;
    }
  })();
  return bootstrapPromise;
};

module.exports = bootstrap;
