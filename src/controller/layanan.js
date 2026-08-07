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
            serverMessage: error
        });
    }
};

module.exports = { getLayanan };
