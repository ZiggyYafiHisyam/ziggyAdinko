const db = require('../config/database');

const getLayanan = () => {
    const SQLQuery = 'SELECT * FROM layanan';
    return db.execute(SQLQuery);
};

module.exports = { getLayanan };
