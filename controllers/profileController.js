const UserProfile = require('../models/UserProfile');

exports.setupProfile = async (req, res) => {

    try {
        console.log(req.user);
        const userId = req.user.id;

        const {
            username,
            fullName,
            gender,
            stressLevel,
            favoriteActivity
        } = req.body;

        if (!username) {

            return res.status(400).json({
                success: false,
                message: 'Username wajib diisi'
            });
        }

        const profile = await UserProfile.createProfile(
            userId,
            username,
            fullName,
            gender,
            stressLevel,
            favoriteActivity
        );

        res.status(201).json({
            success: true,
            message: 'Profile berhasil dibuat',
            data: profile
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.getProfile = async (req, res) => {

    try {

        const userId = req.user.id;

        const profile = await UserProfile.getProfileByUserId(userId);

        res.json({
            success: true,
            data: profile
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};