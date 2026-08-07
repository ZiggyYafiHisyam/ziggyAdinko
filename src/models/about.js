const db = require('../config/database');

const getAbout = () => {
    const SQLQuery = 'SELECT * FROM about';
    return db.execute(SQLQuery);
};

module.exports = { getAbout };
