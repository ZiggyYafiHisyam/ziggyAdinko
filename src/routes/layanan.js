const express = require('express');
const LayananController = require('../controller/layanan');
const { requireAuth } = require('../middleware/auth');
const router = express.Router();

router.get('/', LayananController.getLayanan);
router.post('/', requireAuth, LayananController.createLayanan);
router.put('/:id', requireAuth, LayananController.updateLayanan);
router.delete('/:id', requireAuth, LayananController.deleteLayanan);

module.exports = router;
