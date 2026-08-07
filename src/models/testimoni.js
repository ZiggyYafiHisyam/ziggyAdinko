const db = require('../config/database');

const getTestimoni = () => {
    const SQLQuery = 'SELECT * FROM testimoni';
    return db.execute(SQLQuery);
};

module.exports = { getTestimoni };
