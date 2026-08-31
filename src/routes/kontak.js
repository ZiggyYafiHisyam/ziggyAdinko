const express = require('express');
const KontakController = require('../controller/kontak.js');
const { requireAuth } = require('../middleware/auth');
const router = express.Router();

// GET kontak data (Public)
router.get('/', KontakController.getKontak);

// PUT update kontak data (Admin)
router.put('/', requireAuth, KontakController.updateKontak);

// POST kirim pesan dari form kontak (Public)
router.post('/', KontakController.createMessage);

// GET & DELETE admin messages inbox (Admin)
router.get('/messages', requireAuth, KontakController.getMessages);
router.delete('/messages/:id', requireAuth, KontakController.deleteMessage);

module.exports = router;
