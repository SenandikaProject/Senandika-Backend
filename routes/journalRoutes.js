const express = require('express');

const router = express.Router();

const journalController = require('../controllers/journalController');
const authMiddleware = require('../middleware/authMiddleware');
const upload  = require('../middleware/journalUploads');

router.post('/', authMiddleware,upload.single('image'), journalController.createJournal);
router.get('/', authMiddleware, journalController.getJournals);
router.get('/streak', authMiddleware, journalController.getStreak);

router.get('/:id', authMiddleware, journalController.getJournalById);
router.put('/:id', authMiddleware, upload.single('image'), journalController.updateJournal);
router.delete('/:id', authMiddleware, journalController.deleteJournals); // Untuk hapus satu per satu
router.delete('/', authMiddleware, journalController.deleteJournals);    // Untuk bulk delete via query (?ids=1,2,3)

module.exports = router;