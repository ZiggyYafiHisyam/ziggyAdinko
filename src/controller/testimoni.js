const TestimoniModels = require('../models/testimoni');

const getTestimoni = async (req, res) => {
    try {
        const [data] = await TestimoniModels.getTestimoni();
        res.json({
            message: 'Testimoni messages retrieved',
            data: data
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error retrieving testimoni messages',
            serverMessage: error
        });
    }
};

module.exports = { getTestimoni };
