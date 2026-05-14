const pool = require('../config/db');

exports.findAll = async () => {

    const result = await pool.query(
        'SELECT * FROM activity_suggestions ORDER BY id ASC'
    );

    return result.rows;
};

exports.findById = async (id) => {

    const result = await pool.query(
        'SELECT * FROM activity_suggestions WHERE id = $1',
        [id]
    );

    return result.rows[0];
};