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
        SELECT *
        FROM user_profiles
        WHERE user_id = $1
        `,
        [userId]
    );

    return result.rows[0];
};

module.exports = {
    createProfile,
    getProfileByUserId
};