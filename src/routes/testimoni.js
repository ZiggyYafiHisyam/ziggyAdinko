const express = require('express');
const TestimoniController = require('../controller/testimoni.js');
const router = express.Router();

router.get('/', TestimoniController.getTestimoni);

module.exports = router;
