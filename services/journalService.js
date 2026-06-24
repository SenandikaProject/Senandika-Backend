const Journal = require("../models/Journal");

exports.createJournal = async (data) => {
  let streak = 1;

  const latestJournal = await Journal.getLatestJournal(data.user_id);

  if (latestJournal) {
    // Ambil tanggal hari ini (Format: YYYY-MM-DD)
    const today = new Date().toISOString().split("T")[0];

    // Ambil tanggal jurnal terakhir (Pastikan formatnya YYYY-MM-DD dari database)
    // Jika format di DB berupa objek Date atau ISO string lengkap, bersihkan dulu ke format YYYY-MM-DD
    const lastJournalDate = new Date(latestJournal.tanggal)
      .toISOString()
      .split("T")[0];

    // Hitung selisih hari antara hari ini dan jurnal terakhir
    const diffTime = Math.abs(new Date(today) - new Date(lastJournalDate));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      // JIKA SUDAH MENULIS HARI INI: Streak tidak bertambah, gunakan streak terakhir
      streak = latestJournal.streak;
    } else if (diffDays === 1) {
      // JIKA TERAKHIR MENULIS KEMARIN: Streak berlanjut (tambah 1)
      streak = latestJournal.streak + 1;
    } else {
      // JIKA BOLONG LEBIH DARI 1 HARI: Streak hangus, reset kembali ke 1
      streak = 1;
    }
  }

  data.streak = streak;

  return await Journal.create(data);
};

exports.getJournals = async (userId) => {
  return await Journal.findByUser(userId);
};

exports.getStreak = async (userId) => {
  const latestJournal = await Journal.getLatestJournal(userId);

  if (!latestJournal) {
    return { streak: 0 };
  }

  // Validasi tambahan saat GET: Jika user sudah bolong menulis lebih dari 1 hari dari hari ini,
  // kembalikan streak sebagai 0 agar UI langsung mendeteksi streak-nya sudah hangus.
  const today = new Date().toISOString().split("T")[0];
  const lastJournalDate = new Date(latestJournal.tanggal)
    .toISOString()
    .split("T")[0];
  const diffTime = Math.abs(new Date(today) - new Date(lastJournalDate));
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return {
    streak: diffDays <= 1 ? latestJournal.streak : 0,
  };
};
