const pool = require('../config/db');

exports.create = async (data) => {

    await pool.query(
        `
        INSERT INTO reset_password_tokens(
            user_id,
            token,
            expired_at
        )
        VALUES($1, $2, $3)
        `,
        [
            data.user_id,
            data.token,
            data.expired_at
        ]
    );
};

exports.findByToken = async (token) => {

    const result = await pool.query(
        'SELECT * FROM reset_password_tokens WHERE token = $1',
        [token]
    );

    return result.rows[0];
};