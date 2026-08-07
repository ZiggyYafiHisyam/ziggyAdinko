const express = require('express');
const LayananController = require('../controller/layanan.js');
const router = express.Router();

router.get('/', LayananController.getLayanan);

module.exports = router;
