const express = require('express');
const KontakController = require('../controller/kontak.js');
const router = express.Router();

// GET kontak data
router.get('/', KontakController.getKontak);

// POST kirim pesan ke DB
router.post('/', KontakController.createMessage);

module.exports = router;
