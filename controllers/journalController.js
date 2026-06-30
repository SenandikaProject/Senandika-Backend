const journalService = require('../services/journalService');

exports.createJournal = async (req, res) => {

    try {
        console.log("BODY:", req.body);
        console.log("FILE:", req.file);
        console.log("USER:", req.user);
        const imagePath = req.file
            ? `/uploads/journals/${req.file.filename}`
            : null;

        const result = await journalService.createJournal({
            ...req.body,
            user_id: req.user.id,
            image_path: imagePath

        });

        res.status(201).json(result);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message,
            detail: error.detail
        });
    }
};
exports.getJournalById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await journalService.getJournalById(id, req.user.id);

        if (!result) {
            return res.status(404).json({ message: "Jurnal tidak ditemukan" });
        }
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getJournals = async (req, res) => {

    try {

        const result = await journalService.getJournals(req.user.id);

        res.json(result);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

exports.getStreak = async (req, res) => {

    try {

        const result = await journalService.getStreak(req.user.id);

        res.json(result);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};


exports.updateJournal = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Ambil image_path jika ada file baru yang diupload
        const imagePath = req.file
            ? `/uploads/journals/${req.file.filename}`
            : undefined; // Gunakan undefined agar service tahu tidak ada file baru dimasukkan

        const updateData = {
            ...req.body,
        };

        if (imagePath !== undefined) {
            updateData.image_path = imagePath;
        }

        const result = await journalService.updateJournal(id, req.user.id, updateData);
        
        if (!result) {
            return res.status(404).json({ message: "Jurnal tidak ditemukan atau bukan milik Anda" });
        }
        
        res.json({ success: true, data: result });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteJournals = async (req, res) => {
    try {
        let targetIds = [];
        
        // Cek apakah parameter ids dikirim via Query Parameter (?ids=1,2,3)
        if (req.query.ids && req.query.ids.trim() !== "") {
            targetIds = req.query.ids.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id));
        } 
        // Cek apakah dikirim via Path Parameter (/:id) untuk hapus satu per satu
        else if (req.params.id) {
            targetIds = [parseInt(req.params.id)];
        } 
        // Cek jika dikirim di dalam Request Body JSON ({ "ids": [1, 2] })
        else if (req.body.ids && Array.isArray(req.body.ids)) {
            targetIds = req.body.ids;
        }

        if (targetIds.length === 0) {
            return res.status(400).json({ success: false, message: "Tidak ada ID jurnal valid yang dipilih untuk dihapus" });
        }

        const deletedCount = await journalService.deleteJournals(targetIds, req.user.id);
        
        if (deletedCount === 0) {
            return res.status(404).json({ success: false, message: "Jurnal tidak ditemukan atau Anda tidak memiliki akses" });
        }

        res.json({ success: true, message: `${deletedCount} jurnal berhasil dihapus` });
    } catch (error) {
        console.error("Error Delete Backend:", error); // Menampilkan log eror asli di terminal backend Anda
        res.status(500).json({ success: false, message: error.message });
    }
};