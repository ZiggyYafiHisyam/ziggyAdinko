const db = require('../config/database');

// The `page_content` table is created by src/config/bootstrap.js.
// One row per editable field: (page, ckey) -> value (TEXT, may be an image URL).

const getAll = () => {
    return db.execute('SELECT page, ckey, value FROM page_content');
};

const getByPage = (page) => {
    return db.execute('SELECT ckey, value FROM page_content WHERE page = ?', [page]);
};

const upsert = (page, ckey, value) => {
    return db.execute(
        `INSERT INTO page_content (page, ckey, value) VALUES (?, ?, ?)
         ON DUPLICATE KEY UPDATE value = VALUES(value)`,
        [page, ckey, value]
    );
};

const remove = (page, ckey) => {
    return db.execute('DELETE FROM page_content WHERE page = ? AND ckey = ?', [page, ckey]);
};

module.exports = { getAll, getByPage, upsert, remove };
