const KontakModels = require('../models/kontak');

// GET - return kontak data
const getKontak = async (req, res) => {
    try {
        const [data] = await KontakModels.getKontak();
        res.json({
            message: 'Kontak data has been retrieved',
            data: data
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error retrieving kontak data',
            serverMessage: error.message || error
        });
    }
};

// PUT - update kontak settings (Admin)
const updateKontak = async (req, res) => {
    try {
        await KontakModels.updateKontak(req.body);
        res.json({
            message: 'Pengaturan kontak berhasil diperbarui',
            data: req.body
        });
    } catch (error) {
        res.status(500).json({
            message: 'Gagal memperbarui pengaturan kontak',
            serverMessage: error.message || error
        });
    }
};

// POST - terima inputan pesan dari web dan simpan ke DB (Public)
const createMessage = async (req, res) => {
    const { name, noWA, location, kebutuhan, details } = req.body;

    if (!name || !noWA || !kebutuhan) {
        return res.status(400).json({ message: 'Missing required fields: name, noWA or kebutuhan' });
    }

    try {
        const result = await KontakModels.createMessage({ name, noWA, location, kebutuhan, details });
        res.status(201).json({
            message: 'Message received',
            data: {
                id: result[0].insertId,
                name,
                noWA,
                location,
                kebutuhan,
                details
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to save message', serverMessage: error.message || error });
    }
};

// GET - ambil semua pesan masuk untuk Admin
const getMessages = async (req, res) => {
    try {
        const [data] = await KontakModels.getMessages();
        res.json({
            message: 'Messages list retrieved',
            data: data
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve messages', serverMessage: error.message || error });
    }
};

// DELETE - hapus pesan masuk untuk Admin
const deleteMessage = async (req, res) => {
    const { id } = req.params;
    try {
        await KontakModels.deleteMessage(id);
        res.json({ message: 'Pesan berhasil dihapus', id });
    } catch (error) {
        res.status(500).json({ message: 'Gagal menghapus pesan', serverMessage: error.message || error });
    }
};

module.exports = {
    getKontak,
    updateKontak,
    createMessage,
    getMessages,
    deleteMessage
};
