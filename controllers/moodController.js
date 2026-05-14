const moodService = require('../services/moodService');

exports.createMood = async (req, res) => {

    try {

        const result = await moodService.createMood({
            ...req.body,
            user_id: req.user.id
        });

        res.status(201).json(result);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

exports.getMoods = async (req, res) => {

    try {

        const result = await moodService.getMoods(req.user.id);

        res.json(result);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

exports.getStatistics = async (req, res) => {

    try {

        const result = await moodService.getStatistics(req.user.id);

        res.json(result);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};