const pool = require('../config/db');

exports.create = async (data) => {

    const result = await pool.query(
        `
        INSERT INTO journals(
            tanggal,
            isi,
            streak,
            user_id
        )
        VALUES($1, $2, $3, $4)
        RETURNING *
        `,
        [
            data.tanggal,
            data.isi,
            data.streak,
            data.user_id
        ]
    );

    return result.rows[0];
};

exports.findByUser = async (userId) => {

    const result = await pool.query(
        'SELECT * FROM journals WHERE user_id = $1 ORDER BY tanggal DESC',
        [userId]
    );

    return result.rows;
};

exports.getLatestJournal = async (userId) => {

    const result = await pool.query(
        'SELECT * FROM journals WHERE user_id = $1 ORDER BY tanggal DESC LIMIT 1',
        [userId]
    );

    return result.rows[0];
};