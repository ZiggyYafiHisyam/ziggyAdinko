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
            serverMessage: error
        });
    }
};

module.exports = { getTestimoni };
