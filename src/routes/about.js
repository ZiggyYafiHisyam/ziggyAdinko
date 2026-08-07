const express = require('express');
const AboutController = require('../controller/about.js');
const router = express.Router();

router.get('/', AboutController.getAbout);

module.exports = router;
