const express = require('express');
const PageContentController = require('../controller/pageContent');
const { requireAuth } = require('../middleware/auth');
const router = express.Router();

// Public: read content overrides
router.get('/', PageContentController.getAllContent);
router.get('/:page', PageContentController.getPageContent);

// Admin: save content overrides for one page
router.put('/:page', requireAuth, PageContentController.savePageContent);

module.exports = router;
