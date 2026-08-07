const db = require('../config/database');

const getPortofolio = () => {
    const SQLQuery = 'SELECT * FROM portofolio';
    return db.execute(SQLQuery);
};

module.exports = { getPortofolio };
