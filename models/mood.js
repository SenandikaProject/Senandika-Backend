const pool = require('../config/db');

exports.create = async (data) => {

    const result = await pool.query(
        `
        INSERT INTO moods(
            tanggal,
            tingkat_mood,
            catatan,
            user_id
        )
        VALUES($1, $2, $3, $4)
        RETURNING *
        `,
        [
            data.tanggal,
            data.tingkat_mood,
            data.catatan,
            data.user_id
        ]
    );

    return result.rows[0];
};

exports.findByUser = async (userId) => {

    const result = await pool.query(
        'SELECT * FROM moods WHERE user_id = $1 ORDER BY tanggal DESC',
        [userId]
    );

    return result.rows;
};

exports.statistics = async (userId) => {

    const result = await pool.query(
        `
        SELECT
            AVG(tingkat_mood) as average_mood,
            MAX(tingkat_mood) as highest_mood,
            MIN(tingkat_mood) as lowest_mood
        FROM moods
        WHERE user_id = $1
        `,
        [userId]
    );

    return result.rows[0];
};