const db = require('../config/database');

const getHome = (req, res) => {
    const SQLQuery = 'SELECT * FROM home';
    return db.execute(SQLQuery);
}

//input data kirim pesan
const createMessage = (body) => {
    const { name, noWA, location, kebutuhan, details } = body;
    const SQLQuery = `INSERT INTO messages (name, noWA, location, kebutuhan, details) VALUES (?, ?, ?, ?, ?)`;
    return db.execute(SQLQuery, [name, noWA, location, kebutuhan, details]);
};

module.exports = { getHome, createMessage };