const express = require('express');

const router = express.Router();

const authMiddleware =
        require('../middleware/authMiddleware');

const upload =
        require('../middleware/uploadMiddleware');

const {
    setupProfile,
    updateProfile,
    getProfile,
    uploadPhoto
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

router.put(
    '/',
    authMiddleware,
    updateProfile
);

router.put(
    '/upload-photo',
    authMiddleware,
    upload.single('photo'),
    uploadPhoto
);
module.exports = router;