const express = require('express');

const router = express.Router();

const recommendationController = require('../controllers/recommendationController');

router.get('/', recommendationController.getRecommendations);
router.get('/:id', recommendationController.getRecommendationById);

module.exports = router;