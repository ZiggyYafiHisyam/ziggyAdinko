const express = require('express');
const AuthController = require('../controller/auth');
const router = express.Router();

router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);
router.get('/me', AuthController.me);

module.exports = router;
