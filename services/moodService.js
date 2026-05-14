const Mood = require('../models/Mood');

exports.createMood = async (data) => {

    return await Mood.create(data);
};

exports.getMoods = async (userId) => {

    return await Mood.findByUser(userId);
};

exports.getStatistics = async (userId) => {

    return await Mood.statistics(userId);
};