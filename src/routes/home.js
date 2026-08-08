const express = require('express');
const HomeController = require('../controller/home.js');
const router = express.Router();

router.get('/', HomeController.getHome);

// route nerima pesan dari web ke DB
router.post('/', HomeController.createMessage);

module.exports = router;