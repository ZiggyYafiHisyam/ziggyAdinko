const PageContentModels = require('../models/pageContent');

// GET /api/pages  -> { data: { home: { 'hero.title': '...' }, layanan: {...}, ... } }
const getAllContent = async (req, res) => {
    try {
        const [rows] = await PageContentModels.getAll();
        const grouped = {};
        for (const row of rows) {
            if (!grouped[row.page]) grouped[row.page] = {};
            grouped[row.page][row.ckey] = row.value;
        }
        res.json({ message: 'Page content retrieved', data: grouped });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving page content', serverMessage: error.message || error });
    }
};

// GET /api/pages/:page -> { data: { 'hero.title': '...' } }
const getPageContent = async (req, res) => {
    try {
        const [rows] = await PageContentModels.getByPage(req.params.page);
        const data = {};
        for (const row of rows) data[row.ckey] = row.value;
        res.json({ message: 'Page content retrieved', data });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving page content', serverMessage: error.message || error });
    }
};

// PUT /api/pages/:page  (admin)
// body: { "hero.title": "custom text", "hero.bg": null }  -> null/'' resets to default (row deleted)
const savePageContent = async (req, res) => {
    const { page } = req.params;
    const payload = req.body || {};

    if (typeof payload !== 'object' || Array.isArray(payload)) {
        return res.status(400).json({ message: 'Body harus berupa objek { key: value }.' });
    }

    try {
        const entries = Object.entries(payload);
        for (const [ckey, rawValue] of entries) {
            if (rawValue === null || rawValue === undefined || rawValue === '') {
                await PageContentModels.remove(page, ckey);
            } else {
                await PageContentModels.upsert(page, ckey, String(rawValue));
            }
        }
        const [rows] = await PageContentModels.getByPage(page);
        const data = {};
        for (const row of rows) data[row.ckey] = row.value;
        res.json({ message: 'Konten halaman berhasil disimpan', data });
    } catch (error) {
        res.status(500).json({ message: 'Gagal menyimpan konten halaman', serverMessage: error.message || error });
    }
};

module.exports = { getAllContent, getPageContent, savePageContent };
