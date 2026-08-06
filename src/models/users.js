// Reqiurement koneksi DB
const db = require('../config/database');
const getAllUsers = () => {
    const SQLQuery = 'SELECT * FROM users';
    return db.execute(SQLQuery);
};

const createNewUser = (body) => {
    const { name, email } = body;
    const SQLQuery = `INSERT INTO users (name, email) VALUES ('${body.name}', '${body.email}')`;
    return db.execute(SQLQuery, [name, email]);
};

const updateUser = (idUser, body) => {
    const { name, email } = body;
    const SQLQuery = `UPDATE users SET name = '${body.name}', email = '${body.email}' WHERE idUser = ${idUser}`;
    return db.execute(SQLQuery);
}

const deleteUser = (idUser) => {
    const SQLQuery = `DELETE FROM users WHERE idUser = ${idUser}`;
    return db.execute(SQLQuery);
}

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
};