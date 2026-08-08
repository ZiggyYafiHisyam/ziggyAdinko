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

//kalo belum connect db
// const getHome = (req, res) => {
//     res.json({
//         message: 'Welcome to Adinko Home Page by Zeke',
//         data: null
//     });
// };

module.exports = { getHome, createMessage };