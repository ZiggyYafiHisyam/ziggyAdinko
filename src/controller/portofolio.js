const PortofolioModels = require('../models/portofolio');

const getPortofolio = async (req, res) => {
    try {
        const [data] = await PortofolioModels.getPortofolio();
        res.json({
            message: 'Portofolio data has been retrieved',
            data: data
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving portofolio data',
            serverMessage: error.message || error
        });
    }
};

const createPortofolio = async (req, res) => {
    const { title, category, location, description, image } = req.body;
    if (!title || !category) {
        return res.status(400).json({ message: 'Judul dan kategori portofolio wajib diisi.' });
    }

    try {
        const [result] = await PortofolioModels.createPortofolio({ title, category, location, description, image });
        res.status(201).json({
            message: 'Portofolio berhasil ditambahkan',
            data: { id: result.insertId, title, category, location, description, image }
        });
    } catch (error) {
        res.status(500).json({ message: 'Gagal menambahkan portofolio', serverMessage: error.message || error });
    }
};

const updatePortofolio = async (req, res) => {
    const { id } = req.params;
    const { title, category, location, description, image } = req.body;

    if (!title || !category) {
        return res.status(400).json({ message: 'Judul dan kategori portofolio wajib diisi.' });
    }

    try {
        await PortofolioModels.updatePortofolio(id, { title, category, location, description, image });
        res.json({
            message: 'Portofolio berhasil diperbarui',
            data: { id, title, category, location, description, image }
        });
    } catch (error) {
        res.status(500).json({ message: 'Gagal memperbarui portofolio', serverMessage: error.message || error });
    }
};

const deletePortofolio = async (req, res) => {
    const { id } = req.params;
    try {
        await PortofolioModels.deletePortofolio(id);
        res.json({ message: 'Portofolio berhasil dihapus', id });
    } catch (error) {
        res.status(500).json({ message: 'Gagal menghapus portofolio', serverMessage: error.message || error });
    }
};

module.exports = {
    getPortofolio,
    createPortofolio,
    updatePortofolio,
    deletePortofolio
};
