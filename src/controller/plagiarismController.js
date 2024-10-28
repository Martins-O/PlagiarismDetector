const SearchService = require('../services/searchService');
const TextService = require('../services/textService');
const PlagiarismReport = require('../models/PlagiarismReport');
const config = require('../config');
const logger = require('../utils/logger');

class PlagiarismController {
    constructor() {
        this.searchService = new SearchService();
        this.textService = new TextService();
        this.similarityThreshold = config.similarityThreshold;
    }

    async detectPlagiarism(text) {
        try {
            // Validate input
            this.textService.validateText(text);
            logger.info('Starting plagiarism detection', { textLength: text.length });

            // Search for potential matches
            const searchResults = await this.searchService.searchWeb(text);
            const matches = [];

            // Process each search result
            for (const result of searchResults) {
                const similarity = this.textService.calculateSimilarity(
                    text,
                    result.description
                );

                if (similarity >= this.similarityThreshold) {
                    matches.push({
                        title: result.title,
                        url: result.url,
                        similarity: similarity.toFixed(2),
                        matchedText: result.description
                    });
                }
            }

            // Create and return report
            const report = new PlagiarismReport(text, matches);

            logger.info('Plagiarism detection completed', {
                totalMatches: matches.length,
                threshold: this.similarityThreshold
            });

            return report;

        } catch (error) {
            logger.error('Error in plagiarism detection:', {
                error: error.message,
                stack: error.stack
            });
            throw error;
        }
    }

    setSimilarityThreshold(threshold) {
        if (threshold < 0 || threshold > 100) {
            throw new Error('Threshold must be between 0 and 100');
        }
        this.similarityThreshold = threshold;
        logger.info('Similarity threshold updated', { newThreshold: threshold });
    }
}

module.exports = PlagiarismController;