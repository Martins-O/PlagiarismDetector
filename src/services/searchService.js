const axios = require('axios');
const config = require('../config');
const constants = require('../config/constants');
const logger = require('../utils/logger');

class SearchService {
    constructor() {
        this.apiKey = config.apiKey;
        this.baseUrl = constants.API_BASE_URL;
    }

    async searchWeb(text) {
        try {
            logger.info('Initiating web search', { textLength: text.length });

            const response = await axios.get(this.baseUrl, {
                headers: {
                    'X-RapidAPI-Key': this.apiKey,
                    'X-RapidAPI-Host': 'contextualwebsearch-websearch-v1.p.rapidapi.com'
                },
                params: {
                    q: text,
                    pageNumber: '1',
                    pageSize: constants.MAX_SEARCH_RESULTS,
                    autoCorrect: 'true'
                }
            });

            logger.info('Web search completed successfully', {
                resultsCount: response.data.value.length
            });

            return response.data.value;
        } catch (error) {
            logger.error('Error in web search:', {
                error: error.message,
                stack: error.stack
            });
            throw new Error(`Search service error: ${error.message}`);
        }
    }
}

module.exports = SearchService;