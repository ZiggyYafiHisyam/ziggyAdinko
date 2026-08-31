const db = require('../config/database');

const getPortofolio = () => {
    const SQLQuery = 'SELECT * FROM portofolio ORDER BY id_portofolio DESC';
    return db.execute(SQLQuery);
};

const getPortofolioById = (id) => {
    const SQLQuery = 'SELECT * FROM portofolio WHERE id_portofolio = ?';
    return db.execute(SQLQuery, [id]);
};

const createPortofolio = (data) => {
    const { title, category, location, description, image } = data;
    const SQLQuery = 'INSERT INTO portofolio (title, category, location, description, image) VALUES (?, ?, ?, ?, ?)';
    return db.execute(SQLQuery, [title, category, location, description, image]);
};

const updatePortofolio = (id, data) => {
    const { title, category, location, description, image } = data;
    const SQLQuery = 'UPDATE portofolio SET title = ?, category = ?, location = ?, description = ?, image = ? WHERE id_portofolio = ?';
    return db.execute(SQLQuery, [title, category, location, description, image, id]);
};

const deletePortofolio = (id) => {
    const SQLQuery = 'DELETE FROM portofolio WHERE id_portofolio = ?';
    return db.execute(SQLQuery, [id]);
};

module.exports = {
    getPortofolio,
    getPortofolioById,
    createPortofolio,
    updatePortofolio,
    deletePortofolio
};
