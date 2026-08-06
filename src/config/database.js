// Requirement untuk koneksi ke DB
const mysql = require('mysql2');

// Bikin connection ke DB
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'express_mysql',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = db.promise();