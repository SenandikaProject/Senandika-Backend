const pool = require('../config/db');

const createProfile = async (
    userId,
    username,
    fullName,
    gender,
    stressLevel,
    favoriteActivity
) => {

    const query = `
        INSERT INTO user_profiles (
            user_id,
            username,
            full_name,
            gender,
            stress_level,
            favorite_activity,
            profile_completed
        )
        VALUES ($1,$2,$3,$4,$5,$6,true)
        RETURNING *
    `;

    const values = [
        userId,
        username,
        fullName,
        gender,
        stressLevel,
        favoriteActivity
    ];

    const result = await pool.query(query, values);

    return result.rows[0];
};

const getProfileByUserId = async (userId) => {

    const result = await pool.query(
    `
    SELECT
        up.username,
        up.full_name,
        up.gender,
        up.stress_level,
        up.favorite_activity,
        up.profile_picture,
        u.email
    FROM user_profiles up
    JOIN users u
        ON up.user_id = u.id
    WHERE up.user_id = $1
    `,
    [userId]
);

    return result.rows[0];
};

const updateProfile = async (
    userId,
    username,
    fullName,
    gender,
    stressLevel,
    favoriteActivity
) => {

    const result = await pool.query(
        `
        UPDATE user_profiles
        SET
            username = $1,
            full_name = $2,
            gender = $3,
            stress_level = $4,
            favorite_activity = $5
        WHERE user_id = $6
        RETURNING *
        `,
        [
            username,
            fullName,
            gender,
            stressLevel,
            favoriteActivity,
            userId
        ]
    );

    return result.rows[0];
};

const updateProfilePhoto = async (
    userId,
    profilePicture
) => {

    const result = await pool.query(
        `
        UPDATE user_profiles
        SET profile_picture = $1
        WHERE user_id = $2
        RETURNING *
        `,
        [profilePicture, userId]
    );

    return result.rows[0];
};

const getProfilePicture = async (
    userId
) => {

    const result = await pool.query(
        `
        SELECT profile_picture
        FROM user_profiles
        WHERE user_id = $1
        `,
        [userId]
    );

    return result.rows[0];
};

module.exports = {
    createProfile,
    getProfileByUserId,
    updateProfile,
    updateProfilePhoto,
    getProfilePicture
};