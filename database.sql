-- Canonical schema for the Adinko x GhaziSportsHub site.
-- Run this once in MySQL Workbench against your local MySQL or your Railway MySQL.
-- The DB name must match DB_NAME in your environment (default: express_mysql).
-- The app also auto-creates these tables on startup (src/config/bootstrap.js),
-- so running this by hand is optional but recommended for a clean setup.

CREATE DATABASE IF NOT EXISTS express_mysql;
USE express_mysql;

-- Login credentials for the admin panel.
CREATE TABLE IF NOT EXISTS users (
    id_user INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,          -- stored as "salt:hash" (pbkdf2)
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Single-row settings for the public Kontak page (id_kontak is always 1).
CREATE TABLE IF NOT EXISTS kontak (
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
);

-- Home page content (optional overrides for the hero section).
CREATE TABLE IF NOT EXISTS home (
    id_home INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    subtitle VARCHAR(255),
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS about (
    id_about INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    content TEXT,
    image TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS layanan (
    id_layanan INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    category VARCHAR(100),
    description TEXT,
    image TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS portofolio (
    id_portofolio INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    category VARCHAR(100),
    location VARCHAR(255),
    description TEXT,
    image TEXT,                              -- may hold several comma-separated URLs
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Consultation form submissions from the Home / Kontak pages.
CREATE TABLE IF NOT EXISTS messages (
    id_message INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    noWA VARCHAR(50) NOT NULL,
    location VARCHAR(255),
    kebutuhan VARCHAR(255) NOT NULL,
    details TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS testimoni (
    id_testimoni INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    time_text VARCHAR(100),
    category VARCHAR(100),
    rating INT DEFAULT 5,
    avatar TEXT,
    text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ---------------------------------------------------------------------------
-- Seed data (safe to re-run)
-- ---------------------------------------------------------------------------

-- NOTE: the default admin account (admin / admin321) is created by the app on
-- first start (src/config/bootstrap.js) because the password must be hashed in
-- code. Do not INSERT it by hand here or login will fail.

INSERT IGNORE INTO kontak
    (id_kontak, kontak_title, kontak_description, button_primary_text, button_primary_link,
     button_secondary_text, button_secondary_link, trust_projects, trust_expert, trust_material, trust_survey)
VALUES
    (1,
     'Hubungi Kami',
     'Konsultasikan kebutuhan Anda sekarang juga. Tim kami siap membantu dari survei awal hingga purna jual.',
     'Konsultasi Gratis via WhatsApp', '',
     'Petunjuk Arah Google Maps', '',
     '500+', '8+ Tahun', 'Premium', 'Gratis Survei');
