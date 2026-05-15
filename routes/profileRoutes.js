const express = require('express');

const router = express.Router();

const authMiddleware =
        require('../middleware/authMiddleware');

const {
    setupProfile,
    getProfile
} = require('../controllers/profileController');

router.post(
    '/setup',
    authMiddleware,
    setupProfile
);

router.get(
    '/',
    authMiddleware,
    getProfile
);

module.exports = router;