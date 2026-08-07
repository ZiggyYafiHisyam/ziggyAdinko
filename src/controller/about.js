const AboutModels = require('../models/about');

const getAbout = async (req, res) => {
    try {
        const [data] = await AboutModels.getAbout();
        res.json({
            message: 'About data has been retrieved',
            data: data
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving about data',
            serverMessage: error
        });
    }
};

module.exports = { getAbout };
