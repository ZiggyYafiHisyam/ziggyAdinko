const HomeModels = require('../models/home');

// READ - GET (ambil data isian home)
const getHome = async (req, res) => {
    try {
        const [data] = await HomeModels.getHome();
        res.json({
            message: 'Welcome to Adinko Home Page by Zeke',
            data: data
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// CREATE - POST (terima pengiriman pesan dari web)
const createMessage = async (req, res) => {
    const { name, noWA, location, kebutuhan, details } = req.body;

    if (!name || !noWA || !kebutuhan) {
        return res.status(400).json({ message: 'Missing required fields: name, noWA or kebutuhan' });
    }

    try {
        const result = await HomeModels.createMessage({ name, noWA, location, kebutuhan, details });
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

module.exports = { getHome, createMessage };