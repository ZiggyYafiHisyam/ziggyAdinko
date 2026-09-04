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

    // This is an optional enrichment — never fail the request. Callers fall back
    // to database / static testimonials when `data` is empty.
    if (!apiKey || !placeId) {
        return res.json({
            message: 'Google Maps API Key or Place ID is not configured.',
            data: []
        });
    }

    try {
        // Places API (New) — the legacy maps.googleapis.com/maps/api/place endpoint
        // is disabled for projects created after March 2025.
        const url = `https://places.googleapis.com/v1/places/${placeId}?languageCode=id`;
        const response = await fetch(url, {
            headers: {
                'X-Goog-Api-Key': apiKey,
                'X-Goog-FieldMask': 'id,displayName,rating,reviews'
            }
        });
        const data = await response.json();

        if (!response.ok) {
            const msg = data && data.error ? `${data.error.status} - ${data.error.message}` : `HTTP ${response.status}`;
            throw new Error(`Google Places API Error: ${msg}`);
        }

        const reviews = data.reviews || [];
        const formattedReviews = reviews.map((review, index) => {
            const author = review.authorAttribution || {};
            return {
                id: `google-${index}`,
                name: author.displayName || 'Google User',
                time_text: review.relativePublishTimeDescription || '',
                time: review.publishTime || new Date().toISOString(),
                category: 'Google Maps',
                rating: review.rating || 5,
                avatar: author.photoUri || '',
                text: (review.text && review.text.text) || (review.originalText && review.originalText.text) || ''
            };
        });

        res.json({
            message: 'Google Maps reviews retrieved successfully',
            data: formattedReviews
        });
    } catch (error) {
        // Log for visibility but return 200 with an empty list so the UI can
        // gracefully fall back instead of surfacing an error.
        console.warn('[testimoni] Google reviews unavailable:', error.message || error);
        res.json({
            message: 'Google Maps reviews unavailable',
            serverMessage: error.message || error,
            data: []
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
