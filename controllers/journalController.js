const journalService = require('../services/journalService');

exports.createJournal = async (req, res) => {

    try {

        const result = await journalService.createJournal({
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

exports.getJournals = async (req, res) => {

    try {

        const result = await journalService.getJournals(req.user.id);

        res.json(result);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

exports.getStreak = async (req, res) => {

    try {

        const result = await journalService.getStreak(req.user.id);

        res.json(result);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};