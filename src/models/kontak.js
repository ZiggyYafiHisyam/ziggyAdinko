const db = require('../config/database');

const getKontak = () => {
    const SQLQuery = 'SELECT * FROM kontak LIMIT 1';
    return db.execute(SQLQuery);
};

const updateKontak = (data) => {
    const { 
        kontak_title, 
        kontak_description, 
        button_primary_text, 
        button_primary_link, 
        button_secondary_text, 
        button_secondary_link,
        trust_projects,
        trust_expert,
        trust_material,
        trust_survey
    } = data;

    // Upsert the single settings row (id_kontak = 1) so it works even on a fresh DB.
    const SQLQuery = `
        INSERT INTO kontak
            (id_kontak, kontak_title, kontak_description, button_primary_text, button_primary_link,
             button_secondary_text, button_secondary_link, trust_projects, trust_expert, trust_material, trust_survey)
        VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
            kontak_title = VALUES(kontak_title),
            kontak_description = VALUES(kontak_description),
            button_primary_text = VALUES(button_primary_text),
            button_primary_link = VALUES(button_primary_link),
            button_secondary_text = VALUES(button_secondary_text),
            button_secondary_link = VALUES(button_secondary_link),
            trust_projects = VALUES(trust_projects),
            trust_expert = VALUES(trust_expert),
            trust_material = VALUES(trust_material),
            trust_survey = VALUES(trust_survey)
    `;
    return db.execute(SQLQuery, [
        kontak_title || 'Hubungi Kami',
        kontak_description || '',
        button_primary_text || 'Konsultasi Gratis',
        button_primary_link || '',
        button_secondary_text || 'Petunjuk Arah',
        button_secondary_link || '',
        trust_projects || '500+',
        trust_expert || '8+ Tahun',
        trust_material || 'Premium',
        trust_survey || 'Gratis Survei'
    ]);
};

const createMessage = (body) => {
    const { name, noWA, location, kebutuhan, details } = body;
    const SQLQuery = `INSERT INTO messages (name, noWA, location, kebutuhan, details) VALUES (?, ?, ?, ?, ?)`;
    return db.execute(SQLQuery, [name, noWA, location, kebutuhan, details]);
};

const getMessages = () => {
    const SQLQuery = `SELECT * FROM messages ORDER BY id_message DESC`;
    return db.execute(SQLQuery);
};

const deleteMessage = (id) => {
    const SQLQuery = `DELETE FROM messages WHERE id_message = ?`;
    return db.execute(SQLQuery, [id]);
};

module.exports = {
    getKontak,
    updateKontak,
    createMessage,
    getMessages,
    deleteMessage
};
