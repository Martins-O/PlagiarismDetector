const axios = require('axios');
const config = require('../config');

exports.searchWeb = async (phrase) => {
    try {
        // Example API request (replace with actual implementation or DB search)
        const response = await axios.get(`https://api.example.com/search?q=${phrase}`, {
            headers: { 'Authorization': `Bearer ${config.API_KEY}` }
        });
        return response.data.resultText || ''; // Assuming resultText is returned
    } catch (error) {
        console.error('Error during web search:', error);
        return '';
    }
};