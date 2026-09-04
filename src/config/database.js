const mysql = require('mysql2');

const poolConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'express_mysql',
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0,
    // Serverless (Vercel) talks to a remote DB over a proxy — give the first
    // connection a bit more time and keep idle sockets alive between invocations.
    connectTimeout: 20000,
    enableKeepAlive: true
};

if (process.env.DB_SSL_CA) {
    poolConfig.ssl = {
        ca: process.env.DB_SSL_CA.replace(/\\n/g, '\n'),
        rejectUnauthorized: true
    };
} else if (process.env.DB_SSL === 'true') {
    poolConfig.ssl = {
        rejectUnauthorized: false
    };
}

const db = mysql.createPool(poolConfig);

module.exports = db.promise();