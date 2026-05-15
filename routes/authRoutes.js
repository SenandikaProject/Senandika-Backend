const express = require('express');

const router = express.Router();

const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.put('/reset-password', authController.resetPassword);
router.post('/forgot-password', authController.forgotPassword);
router.put('/change-password', authMiddleware, authController.changePassword);
router.get('/profile', authMiddleware, authController.profile);

module.exports = router;