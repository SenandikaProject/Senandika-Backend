const express = require('express');

const router = express.Router();

const moodController = require('../controllers/moodController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, moodController.createMood);
router.get('/', authMiddleware, moodController.getMoods);
router.get('/statistics', authMiddleware, moodController.getStatistics);

module.exports = router;