const express = require('express');

const router = express.Router();

const journalController = require('../controllers/journalController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, journalController.createJournal);
router.get('/', authMiddleware, journalController.getJournals);
router.get('/streak', authMiddleware, journalController.getStreak);

module.exports = router;