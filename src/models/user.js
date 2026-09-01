const db = require('../config/database');
const { hashPassword } = require('../utils/security');

// The `users` table (schema + default admin seed) is created by src/config/bootstrap.js.

const findByUsername = async (username) => {
    const SQLQuery = 'SELECT * FROM users WHERE username = ? LIMIT 1';
    const [rows] = await db.execute(SQLQuery, [username]);
    return rows[0] || null;
};

const createUser = async ({ username, password, name, role = 'admin' }) => {
    const hashedPassword = hashPassword(password);
    const SQLQuery = 'INSERT INTO users (username, password, name, role) VALUES (?, ?, ?, ?)';
    return db.execute(SQLQuery, [username, hashedPassword, name, role]);
};

module.exports = {
    findByUsername,
    createUser
};
