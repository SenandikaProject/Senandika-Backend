const authService = require('../services/authService');

exports.register = async (req, res) => {

    try {

        const result = await authService.register(req.body);

        res.status(201).json(result);

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.login = async (req, res) => {

    try {

        const result = await authService.login(req.body);

        res.json(result);

    } catch (error) {

        res.status(401).json({
            success: false,
            message: error.message
        });
    }
};

exports.profile = async (req, res) => {

    try {

        const result = await authService.profile(req.user.id);

        res.json(result);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

exports.changePassword = async (req, res) => {

    try {

        const result = await authService.changePassword(
            req.user.id,
            req.body.oldPassword,
            req.body.newPassword
        );

        res.json(result);

    } catch (error) {

        res.status(400).json({
            message: error.message
        });
    }
};

exports.forgotPassword = async (req, res) => {

    try {

        const result = await authService.forgotPassword(
            req.body.email
        );

        res.json(result);

    } catch (error) {

        res.status(400).json({
            message: error.message
        });
    }
};