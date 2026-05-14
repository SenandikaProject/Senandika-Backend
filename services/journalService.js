const Journal = require('../models/Journal');

exports.createJournal = async (data) => {

    let streak = 1;

    const latestJournal = await Journal.getLatestJournal(
        data.user_id
    );

    if (latestJournal) {
        streak = latestJournal.streak + 1;
    }

    data.streak = streak;

    return await Journal.create(data);
};

exports.getJournals = async (userId) => {

    return await Journal.findByUser(userId);
};

exports.getStreak = async (userId) => {

    const latestJournal = await Journal.getLatestJournal(userId);

    return {
        streak: latestJournal ? latestJournal.streak : 0
    };
};