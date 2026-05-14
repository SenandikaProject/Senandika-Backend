const pool = require('../config/db');

exports.findByEmail = async (email) => {

    const result = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
    );

    return result.rows[0];
};

exports.findById = async (id) => {

    const result = await pool.query(
        'SELECT id, email FROM users WHERE id = $1',
        [id]
    );

    return result.rows[0];
};

exports.create = async ({ email, password }) => {

    const result = await pool.query(
        `
        INSERT INTO users(email, password)
        VALUES($1, $2)
        RETURNING id, email
        `,
        [email, password]
    );

    return result.rows[0];
};

exports.updatePassword = async (id, password) => {

    await pool.query(
        'UPDATE users SET password = $1 WHERE id = $2',
        [password, id]
    );
};