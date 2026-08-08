const db = require('../config/database');

const getKontak = () => {
    const SQLQuery = 'SELECT * FROM kontak';
    return db.execute(SQLQuery);
};

const createMessage = (body) => {
    const { name, noWA, location, kebutuhan, details } = body;
    const SQLQuery = `INSERT INTO messages (name, noWA, location, kebutuhan, details) VALUES (?, ?, ?, ?, ?)`;
    return db.execute(SQLQuery, [name, noWA, location, kebutuhan, details]);
};

module.exports = { getKontak, createMessage };
