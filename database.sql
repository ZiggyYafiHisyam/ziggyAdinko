CREATE TABLE IF NOT EXISTS kontak (
    id_kontak INT AUTO_INCREMENT PRIMARY KEY,
    kontak_badge VARCHAR(100),
    kontak_title VARCHAR(255) NOT NULL,
    kontak_description TEXT,
    kontak_background_image VARCHAR(255),
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

-- Table to store home page content
CREATE TABLE IF NOT EXISTS home (
    id_home INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    subtitle VARCHAR(255),
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table to store messages submitted from the home or kontak pages
CREATE TABLE IF NOT EXISTS messages (
    id_message INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    noWA VARCHAR(50) NOT NULL,
    location VARCHAR(255),
    kebutuhan VARCHAR(255) NOT NULL,
    details TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);