const express = require('express');
const PortofolioController = require('../controller/portofolio.js');
const router = express.Router();

router.get('/', PortofolioController.getPortofolio);

module.exports = router;
