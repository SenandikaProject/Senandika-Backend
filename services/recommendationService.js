const ActivitySuggestion = require('../models/ActivitySuggestion');

exports.getRecommendations = async () => {

    return await ActivitySuggestion.findAll();
};

exports.getRecommendationById = async (id) => {

    return await ActivitySuggestion.findById(id);
};