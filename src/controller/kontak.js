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
            serverMessage: error
        });
    }
};

// terima inputan pesan dari web dan simpan ke DB
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to save message', serverMessage: error });
    }
};

module.exports = { getKontak, createMessage };
