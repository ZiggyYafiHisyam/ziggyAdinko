const db = require('../config/database');

const getKontak = () => {
    const SQLQuery = 'SELECT * FROM kontak';
    return db.execute(SQLQuery);
};

module.exports = { getKontak };
