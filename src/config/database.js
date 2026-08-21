const mysql = require('mysql2');

const ssl = process.env.DB_SSL_CA
    ? {
        ca: process.env.DB_SSL_CA.replace(/\\n/g, '\n'),
        rejectUnauthorized: true
    }
    : {};

const db = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 4000),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'express_mysql',
    ssl,
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0
});

module.exports = db.promise();