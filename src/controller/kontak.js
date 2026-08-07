const KontakModels = require('../models/kontak');

const getKontak = async (req, res) => {
    try {
        const [data] = await KontakModels.getKontak();
        res.json({
            message: 'Kontak data has been retrieved',
            data: data
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving kontak data',
            serverMessage: error
        });
    }
};

module.exports = { getKontak };
