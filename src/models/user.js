const db = require('../config/database');
const { hashPassword } = require('../utils/security');

const ensureAdminTableAndSeed = async () => {
    try {
        await db.execute(`
            CREATE TABLE IF NOT EXISTS admin_users (
                id_admin INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(100) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                name VARCHAR(255) NOT NULL,
                role VARCHAR(50) DEFAULT 'admin',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);

        // Check if default admin exists
        const [rows] = await db.execute('SELECT * FROM admin_users WHERE username = ? LIMIT 1', ['admin']);
        if (rows.length === 0) {
            const hashedPassword = hashPassword('admin321');
            await db.execute(
                'INSERT INTO admin_users (username, password, name, role) VALUES (?, ?, ?, ?)',
                ['admin', hashedPassword, 'Administrator Adinko', 'admin']
            );
            console.log('[Auth] Akun default admin berhasil diinisialisasi (username: admin, password: admin321)');
        }
    } catch (err) {
        console.warn('[Auth] ensureAdminTableAndSeed notice:', err.message);
    }
};

// Initialize table on load
ensureAdminTableAndSeed();

const findByUsername = async (username) => {
    const SQLQuery = 'SELECT * FROM admin_users WHERE username = ? LIMIT 1';
    const [rows] = await db.execute(SQLQuery, [username]);
    return rows[0] || null;
};

const createUser = async ({ username, password, name, role = 'admin' }) => {
    const hashedPassword = hashPassword(password);
    const SQLQuery = 'INSERT INTO admin_users (username, password, name, role) VALUES (?, ?, ?, ?)';
    return db.execute(SQLQuery, [username, hashedPassword, name, role]);
};

module.exports = {
    findByUsername,
    createUser,
    ensureAdminTableAndSeed
};
