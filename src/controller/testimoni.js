const TestimoniModels = require('../models/testimoni');

const getTestimoni = async (req, res) => {
    try {
        const [data] = await TestimoniModels.getTestimoni();
        res.json({
            message: 'Testimoni data has been retrieved',
            data: data
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving testimoni data',
            serverMessage: error.message || error
        });
    }
};

const createTestimoni = async (req, res) => {
    const { name, time_text, category, rating, avatar, text } = req.body;
    if (!name || !text) {
        return res.status(400).json({ message: 'Nama dan teks testimoni wajib diisi.' });
    }

    try {
        const [result] = await TestimoniModels.createTestimoni({ name, time_text, category, rating, avatar, text });
        res.status(201).json({
            message: 'Testimoni berhasil ditambahkan',
            data: { id: result.insertId, name, time_text, category, rating, avatar, text }
        });
    } catch (error) {
        res.status(500).json({ message: 'Gagal menambahkan testimoni', serverMessage: error.message || error });
    }
};

const updateTestimoni = async (req, res) => {
    const { id } = req.params;
    const { name, time_text, category, rating, avatar, text } = req.body;

    if (!name || !text) {
        return res.status(400).json({ message: 'Nama dan teks testimoni wajib diisi.' });
    }

    try {
        await TestimoniModels.updateTestimoni(id, { name, time_text, category, rating, avatar, text });
        res.json({
            message: 'Testimoni berhasil diperbarui',
            data: { id, name, time_text, category, rating, avatar, text }
        });
    } catch (error) {
        res.status(500).json({ message: 'Gagal memperbarui testimoni', serverMessage: error.message || error });
    }
};

const deleteTestimoni = async (req, res) => {
    const { id } = req.params;
    try {
        await TestimoniModels.deleteTestimoni(id);
        res.json({ message: 'Testimoni berhasil dihapus', id });
    } catch (error) {
        res.status(500).json({ message: 'Gagal menghapus testimoni', serverMessage: error.message || error });
    }
};

module.exports = {
    getTestimoni,
    createTestimoni,
    updateTestimoni,
    deleteTestimoni
};
