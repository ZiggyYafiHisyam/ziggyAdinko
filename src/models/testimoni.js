const db = require('../config/database');

// ambil data inputan dari DB buat halaman testi
const getTestimoni = () => {
    const SQLQuery = `SELECT id_message AS id, name, noWA, location, kebutuhan, details, created_at FROM messages ORDER BY created_at DESC`;
    return db.execute(SQLQuery);
};

module.exports = { getTestimoni };
