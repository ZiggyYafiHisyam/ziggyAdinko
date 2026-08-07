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
            serverMessage: error
        });
    }
};

module.exports = { getPortofolio };
