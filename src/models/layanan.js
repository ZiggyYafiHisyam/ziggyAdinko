const db = require('../config/database');

const getLayanan = () => {
    const SQLQuery = 'SELECT * FROM layanan ORDER BY id_layanan DESC';
    return db.execute(SQLQuery);
};

const getLayananById = (id) => {
    const SQLQuery = 'SELECT * FROM layanan WHERE id_layanan = ?';
    return db.execute(SQLQuery, [id]);
};

const createLayanan = (data) => {
    const { title, category, description, image } = data;
    const SQLQuery = 'INSERT INTO layanan (title, category, description, image) VALUES (?, ?, ?, ?)';
    return db.execute(SQLQuery, [title, category, description ?? null, image ?? null]);
};

const updateLayanan = (id, data) => {
    const { title, category, description, image } = data;
    const SQLQuery = 'UPDATE layanan SET title = ?, category = ?, description = ?, image = ? WHERE id_layanan = ?';
    return db.execute(SQLQuery, [title, category, description ?? null, image ?? null, id]);
};

const deleteLayanan = (id) => {
    const SQLQuery = 'DELETE FROM layanan WHERE id_layanan = ?';
    return db.execute(SQLQuery, [id]);
};

module.exports = {
    getLayanan,
    getLayananById,
    createLayanan,
    updateLayanan,
    deleteLayanan
};
