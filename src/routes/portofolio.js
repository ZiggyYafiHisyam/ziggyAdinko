const express = require('express');
const PortofolioController = require('../controller/portofolio');
const { requireAuth } = require('../middleware/auth');
const router = express.Router();

router.get('/', PortofolioController.getPortofolio);
router.post('/', requireAuth, PortofolioController.createPortofolio);
router.put('/:id', requireAuth, PortofolioController.updatePortofolio);
router.delete('/:id', requireAuth, PortofolioController.deletePortofolio);

module.exports = router;
