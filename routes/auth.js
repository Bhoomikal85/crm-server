const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { loginLimiter } = require('../middleware/rateLimiter');

router.post('/signup', authController.signup);
router.post('/login', loginLimiter, authController.login);
router.post('/refresh', authController.refresh); // path used by cookie: /auth/refresh
router.post('/logout', authController.logout);

module.exports = router;
