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

const getGoogleReviews = async (req, res) => {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const placeId = process.env.GOOGLE_PLACE_ID;

    if (!apiKey || !placeId) {
        return res.status(500).json({
            message: 'Google Maps API Key or Place ID is not configured.',
            data: []
        });
    }

    try {
        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,reviews&key=${apiKey}&reviews_sort=newest&language=id`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.status !== 'OK') {
            throw new Error(`Google API Error: ${data.status} - ${data.error_message || ''}`);
        }

        const reviews = data.result.reviews || [];
        const formattedReviews = reviews.map((review, index) => ({
            id: `google-${index}`,
            name: review.author_name,
            time_text: review.relative_time_description,
            time: new Date(review.time * 1000).toISOString(),
            category: 'Google Maps',
            rating: review.rating,
            avatar: review.profile_photo_url,
            text: review.text
        }));

        res.json({
            message: 'Google Maps reviews retrieved successfully',
            data: formattedReviews
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching Google Maps reviews',
            serverMessage: error.message || error
        });
    }
};

module.exports = {
    getTestimoni,
    createTestimoni,
    updateTestimoni,
    deleteTestimoni,
    getGoogleReviews
};
