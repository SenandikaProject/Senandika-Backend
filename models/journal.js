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
        'SELECT * FROM journals WHERE user_id = $1 ORDER BY created_at DESC',
        [userId]
    );

    return result.rows;
};

exports.findById = async (id, userId) => {
    const result = await pool.query(
        'SELECT * FROM journals WHERE id = $1 AND user_id = $2',
        [id, userId]
    );
    return result.rows[0];
};

exports.getLatestJournal = async (userId) => {

    const result = await pool.query(
        'SELECT * FROM journals WHERE user_id = $1 ORDER BY created_at DESC LIMIT 1',
        [userId]
    );

    return result.rows[0];
};

exports.update = async (id, userId, data) => {
    const result = await pool.query(
        `
        UPDATE journals
        SET 
            judul = $1,
            isi = $2,
            image_path = COALESCE($3, image_path)
        WHERE id = $4 AND user_id = $5
        RETURNING *
        `,
        [
            data.judul,
            data.isi,
            data.image_path || null, // Jika kosong, COALESCE akan mempertahankan data lama di database
            id,
            userId
        ]
    );

    return result.rows[0];
};

exports.deleteJournals = async (req, res) => {
    try {
        let targetIds = [];
        
        // 1. Cek parameter query massal (?ids=1,2,3)
        if (req.query.ids && req.query.ids.trim() !== "") {
            targetIds = req.query.ids
                .split(',')
                .map(id => parseInt(id.trim()))
                .filter(id => !isNaN(id));
        } 
        // 2. Cek parameter path tunggal (/:id)
        else if (req.params.id) {
            targetIds = [parseInt(req.params.id)];
        } 
        // 3. Cek body JSON (opsional: { "ids": [1, 2] })
        else if (req.body.ids && Array.isArray(req.body.ids)) {
            targetIds = req.body.ids;
        }

        if (targetIds.length === 0) {
            return res.status(400).json({ 
                success: false, 
                message: "Tidak ada ID jurnal valid yang dipilih untuk dihapus" 
            });
        }

        // Panggil service untuk eksekusi ke database
        const deletedCount = await journalService.deleteJournals(targetIds, req.user.id);
        
        if (deletedCount === 0) {
            return res.status(404).json({ 
                success: false, 
                message: "Jurnal tidak ditemukan atau Anda tidak memiliki akses" 
            });
        }

        res.json({ 
            success: true, 
            message: `${deletedCount} jurnal berhasil dihapus` 
        });
        
    } catch (error) {
        console.error("Error Delete Backend:", error); 
        res.status(500).json({ success: false, message: error.message });
    }
};
