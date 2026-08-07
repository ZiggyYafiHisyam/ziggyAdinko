const express = require('express');
const HomeController = require('../controller/home.js');
const router = express.Router();

router.get('/', HomeController.getHome);

module.exports = router;