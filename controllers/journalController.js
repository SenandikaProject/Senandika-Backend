const journalService = require('../services/journalService');

exports.createJournal = async (req, res) => {

    try {
        console.log("BODY:", req.body);
        console.log("FILE:", req.file);
        console.log("USER:", req.user);
        const imagePath = req.file
            ? `/uploads/journals/${req.file.filename}`
            : null;

        const result = await journalService.createJournal({
            ...req.body,
            user_id: req.user.id,
            image_path: imagePath

        });

        res.status(201).json(result);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message,
            detail: error.detail
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