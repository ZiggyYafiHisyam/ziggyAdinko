const db = require('../config/database');

const ensureTestimoniTable = async () => {
    try {
        await db.execute(`
            CREATE TABLE IF NOT EXISTS testimoni (
                id_testimoni INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                time_text VARCHAR(100),
                category VARCHAR(100),
                rating INT DEFAULT 5,
                avatar VARCHAR(255),
                text TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);
    } catch (err) {
        console.warn('ensureTestimoniTable warning:', err.message);
    }
};

ensureTestimoniTable();

const getTestimoni = () => {
    const SQLQuery = 'SELECT * FROM testimoni ORDER BY id_testimoni DESC';
    return db.execute(SQLQuery);
};

const getTestimoniById = (id) => {
    const SQLQuery = 'SELECT * FROM testimoni WHERE id_testimoni = ?';
    return db.execute(SQLQuery, [id]);
};

const createTestimoni = (data) => {
    const { name, time_text, category, rating = 5, avatar, text } = data;
    const SQLQuery = 'INSERT INTO testimoni (name, time_text, category, rating, avatar, text) VALUES (?, ?, ?, ?, ?, ?)';
    return db.execute(SQLQuery, [name, time_text || 'Baru saja', category || 'Rumput Sintetis', rating || 5, avatar || '', text]);
};

const updateTestimoni = (id, data) => {
    const { name, time_text, category, rating, avatar, text } = data;
    const SQLQuery = 'UPDATE testimoni SET name = ?, time_text = ?, category = ?, rating = ?, avatar = ?, text = ? WHERE id_testimoni = ?';
    return db.execute(SQLQuery, [name, time_text, category, rating, avatar, text, id]);
};

const deleteTestimoni = (id) => {
    const SQLQuery = 'DELETE FROM testimoni WHERE id_testimoni = ?';
    return db.execute(SQLQuery, [id]);
};

module.exports = {
    getTestimoni,
    getTestimoniById,
    createTestimoni,
    updateTestimoni,
    deleteTestimoni
};
