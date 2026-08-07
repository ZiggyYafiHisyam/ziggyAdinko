const express = require('express');
const KontakController = require('../controller/kontak.js');
const router = express.Router();

router.get('/', KontakController.getKontak);

module.exports = router;
