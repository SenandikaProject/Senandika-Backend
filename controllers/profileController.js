const UserProfile = require('../models/UserProfile');
const fs = require('fs');

const path = require('path');

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

exports.updateProfile = async (req, res) => {

    try {

        const userId = req.user.id;

        const {
            username,
            fullName,
            gender,
            stressLevel,
            favoriteActivity
        } = req.body;

        const updatedProfile =
            await UserProfile.updateProfile(
                userId,
                username,
                fullName,
                gender,
                stressLevel,
                favoriteActivity
            );

        res.json({
            success: true,
            message: 'Profile berhasil diperbarui',
            data: updatedProfile
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.uploadPhoto = async (
    req,
    res
) => {

    try {

        const userId = req.user.id;

        if (!req.file) {

            return res.status(400).json({

                success: false,

                message:
                    'File tidak ditemukan'
            });
        }

        // ======================
        // AMBIL FOTO LAMA
        // ======================

        const oldProfile =
                await UserProfile
                .getProfilePicture(
                        userId
                );

        // ======================
        // HAPUS FILE LAMA
        // ======================

        if (
            oldProfile &&
            oldProfile.profile_picture
        ) {

            const oldImagePath =
                    path.join(
                        __dirname,
                        '..',
                        oldProfile.profile_picture
                    );

            if (
                fs.existsSync(oldImagePath)
            ) {

                fs.unlinkSync(oldImagePath);
            }
        }

        // ======================
        // SIMPAN FOTO BARU
        // ======================

        const imagePath =
                `/uploads/profile/${req.file.filename}`;

        const updatedProfile =
                await UserProfile
                .updateProfilePhoto(
                        userId,
                        imagePath
                );

        res.json({

            success: true,

            message:
                'Foto profile berhasil diupload',

            imageUrl: imagePath,

            data: updatedProfile
        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message
        });
    }
};