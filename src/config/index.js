require('dotenv').config();

module.exports = {
    apiKey: process.env.RAPID_API_KEY,
    similarityThreshold: parseInt(process.env.SIMILARITY_THRESHOLD) || 80,
    logLevel: process.env.LOG_LEVEL || 'info',
};