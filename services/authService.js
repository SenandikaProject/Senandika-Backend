const crypto = require('crypto');
const User = require('../models/User');
const ResetPasswordToken = require('../models/ResetPasswordToken');
const {
    hashPassword,
    comparePassword
} = require('../utils/passwordUtils');
const bcrypt = require('bcrypt');
const pool = require('../config/db');
const generateToken = require('../utils/generateToken');

// Method Register
exports.register = async ({ email, password }) => {

    const existingUser = await User.findByEmail(email);

    if (existingUser) {
        throw new Error('Email sudah digunakan');
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
        email,
        password: hashedPassword
    });

    return {
        success: true,
        message: 'Register berhasil',
        user
    };
};

// Method Login
exports.login = async ({ email, password }) => {

    // CEK EMAIL
    const result = await pool.query(
        `
        SELECT *
        FROM users
        WHERE email = $1
        `,
        [email]
    );

    // EMAIL TIDAK ADA
    if (result.rows.length === 0) {

        throw new Error(
                'Email tidak ditemukan'
        );
    }

    // DATA USER
    const user = result.rows[0];

    // CEK PASSWORD
    const isMatch =
            await bcrypt.compare(
                    password,
                    user.password
            );

    // PASSWORD SALAH
    if (!isMatch) {

        throw new Error(
                'Password salah'
        );
    }

    // GENERATE JWT
    const token =
            generateToken(user.id);

    // RETURN DATA
    return {

        token,

        user: {

            id: user.id,
            email: user.email
        }
    };
};

// Forgot Password
exports.forgotPassword = async ({email}) =>{
    return {
        success: true,
        message: "Email ditemukan"
    };
}

