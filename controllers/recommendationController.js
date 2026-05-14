const recommendationService = require('../services/recommendationService');

exports.getRecommendations = async (req, res) => {

    try {

        const result = await recommendationService.getRecommendations();

        res.json(result);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

exports.getRecommendationById = async (req, res) => {

    try {

        const result = await recommendationService.getRecommendationById(
            req.params.id
        );

        res.json(result);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};