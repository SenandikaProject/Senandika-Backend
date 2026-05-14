const crypto = require('crypto');

const User = require('../models/User');
const ResetPasswordToken = require('../models/ResetPasswordToken');

const {
    hashPassword,
    comparePassword
} = require('../utils/passwordUtils');

const generateToken = require('../utils/generateToken');

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

exports.login = async ({ email, password }) => {

    const user = await User.findByEmail(email);

    if (!user) {
        throw new Error('User tidak ditemukan');
    }

    const isMatch = await comparePassword(
        password,
        user.password
    );

    if (!isMatch) {
        throw new Error('Password salah');
    }

    const token = generateToken(user);

    return {
        success: true,
        message: 'Login berhasil',
        token
    };
};

exports.profile = async (userId) => {

    return await User.findById(userId);
};

exports.changePassword = async (
    userId,
    oldPassword,
    newPassword
) => {

    const user = await User.findById(userId);

    const fullUser = await User.findByEmail(user.email);

    const isMatch = await comparePassword(
        oldPassword,
        fullUser.password
    );

    if (!isMatch) {
        throw new Error('Password lama salah');
    }

    const hashedPassword = await hashPassword(newPassword);

    await User.updatePassword(userId, hashedPassword);

    return {
        success: true,
        message: 'Password berhasil diubah'
    };
};

exports.forgotPassword = async (email) => {

    const user = await User.findByEmail(email);

    if (!user) {
        throw new Error('Email tidak ditemukan');
    }

    const token = crypto.randomBytes(32).toString('hex');

    const expiredAt = new Date(Date.now() + 15 * 60 * 1000);

    await ResetPasswordToken.create({
        user_id: user.id,
        token,
        expired_at: expiredAt
    });

    return {
        success: true,
        message: 'Reset token berhasil dibuat',
        token
    };
};