const express = require('express');
const TestimoniController = require('../controller/testimoni');
const { requireAuth } = require('../middleware/auth');
const router = express.Router();

router.get('/google', TestimoniController.getGoogleReviews);
router.get('/', TestimoniController.getTestimoni);
router.post('/', requireAuth, TestimoniController.createTestimoni);
router.put('/:id', requireAuth, TestimoniController.updateTestimoni);
router.delete('/:id', requireAuth, TestimoniController.deleteTestimoni);

module.exports = router;
