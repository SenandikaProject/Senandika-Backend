const authService = require('../services/authService');
const pool = require('../config/db');
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {

    try {

        const result = await authService.register(req.body);

        res.status(201).json(result)
        
    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.login = async (req, res) => {

    try {

        // LOGIN SERVICE
        const result = await authService.login(req.body);

        // AMBIL USER ID
        const userId = result.user.id;

        // CEK APAKAH USER SUDAH PERSONALISASI
        const profileResult = await pool.query(
            `
            SELECT *
            FROM user_profiles
            WHERE user_id = $1
            `,
            [userId]
        );

        // TRUE JIKA PROFILE ADA
        const profileCompleted =
                profileResult.rows.length > 0;

        // RESPONSE FINAL
        res.json({

            success: true,

            message: "Login berhasil",

            token: result.token,

            user: result.user,

            profile_completed:
                    profileCompleted
        });

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

// Change Password
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

// Forgot password
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

//Reset Password
exports.resetPassword = async (req, res) => {

    try {

        const { email, newPassword } = req.body;

        // VALIDASI
        if (!email || !newPassword) {

            return res.status(400).json({
                success: false,
                message: "Email dan password wajib diisi"
            });
        }

        // CEK USER
        const userResult = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        if (userResult.rows.length === 0) {

            return res.status(404).json({
                success: false,
                message: "Email tidak ditemukan"
            });
        }

        // HASH PASSWORD
        const hashedPassword =
                await bcrypt.hash(newPassword, 10);

        // UPDATE PASSWORD
        await pool.query(
            `
            UPDATE users
            SET password = $1
            WHERE email = $2
            `,
            [hashedPassword, email]
        );

        res.json({
            success: true,
            message: "Password berhasil diperbarui"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

