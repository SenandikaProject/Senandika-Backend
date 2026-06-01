const pool = require('../config/db');

exports.create = async (data) => {

    const result = await pool.query(
        `
        INSERT INTO journals(
            tanggal,
            judul,
            isi,
            streak,
            user_id,
            image_path
        )
        VALUES(
            CURRENT_DATE,
            $1,
            $2,
            $3,
            $4,
            $5
        )
        RETURNING *
        `,
        [
            data.judul,
            data.isi,
            data.streak,
            data.user_id,
            data.image_path
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

