const LayananModels = require('../models/layanan');

const getLayanan = async (req, res) => {
    try {
        const [data] = await LayananModels.getLayanan();
        res.json({
            message: 'Layanan data has been retrieved',
            data: data
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving layanan data',
            serverMessage: error.message || error
        });
    }
};

const createLayanan = async (req, res) => {
    const { title, category, description, image } = req.body;
    if (!title || !category) {
        return res.status(400).json({ message: 'Judul dan kategori layanan wajib diisi.' });
    }

    try {
        const [result] = await LayananModels.createLayanan({ title, category, description, image });
        res.status(201).json({
            message: 'Layanan berhasil ditambahkan',
            data: { id: result.insertId, title, category, description, image }
        });
    } catch (error) {
        res.status(500).json({ message: 'Gagal menambahkan layanan', serverMessage: error.message || error });
    }
};

const updateLayanan = async (req, res) => {
    const { id } = req.params;
    const { title, category, description, image } = req.body;

    if (!title || !category) {
        return res.status(400).json({ message: 'Judul dan kategori layanan wajib diisi.' });
    }

    try {
        await LayananModels.updateLayanan(id, { title, category, description, image });
        res.json({
            message: 'Layanan berhasil diperbarui',
            data: { id, title, category, description, image }
        });
    } catch (error) {
        res.status(500).json({ message: 'Gagal memperbarui layanan', serverMessage: error.message || error });
    }
};

const deleteLayanan = async (req, res) => {
    const { id } = req.params;
    try {
        await LayananModels.deleteLayanan(id);
        res.json({ message: 'Layanan berhasil dihapus', id });
    } catch (error) {
        res.status(500).json({ message: 'Gagal menghapus layanan', serverMessage: error.message || error });
    }
};

module.exports = {
    getLayanan,
    createLayanan,
    updateLayanan,
    deleteLayanan
};
