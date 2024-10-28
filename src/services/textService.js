const TextNormalizer = require('../utils/textNormalizer');
const logger = require('../utils/logger');
const {MIN_TEXT_LENGTH} = require("../config/constants");

class TextService {
    constructor() {
        this.normalizer = TextNormalizer;
    }

    calculateSimilarity(str1, str2) {
        try {
            // Normalize both strings
            const normalizedStr1 = this.normalizer.normalize(str1);
            const normalizedStr2 = this.normalizer.normalize(str2);

            // Create matrix for Levenshtein distance calculation
            const matrix = Array(normalizedStr2.length + 1).fill()
                .map(() => Array(normalizedStr1.length + 1).fill(0));

            // Initialize first row and column
            for (let i = 0; i <= normalizedStr1.length; i++) {
                matrix[0][i] = i;
            }
            for (let j = 0; j <= normalizedStr2.length; j++) {
                matrix[j][0] = j;
            }

            // Fill matrix
            for (let j = 1; j <= normalizedStr2.length; j++) {
                for (let i = 1; i <= normalizedStr1.length; i++) {
                    const substitutionCost = normalizedStr1[i - 1] === normalizedStr2[j - 1] ? 0 : 1;
                    matrix[j][i] = Math.min(
                        matrix[j][i - 1] + 1,
                        matrix[j - 1][i] + 1,
                        matrix[j - 1][i - 1] + substitutionCost
                    );
                }
            }

            // Calculate similarity percentage
            const distance = matrix[normalizedStr2.length][normalizedStr1.length];
            const maxLength = Math.max(normalizedStr1.length, normalizedStr2.length);
            const similarity = ((maxLength - distance) / maxLength) * 100;

            logger.debug('Similarity calculation completed', {
                textLength1: str1.length,
                textLength2: str2.length,
                similarity
            });

            return similarity;
        } catch (error) {
            logger.error('Error calculating similarity:', {
                error: error.message,
                stack: error.stack
            });
            throw new Error(`Text service error: ${error.message}`);
        }
    }

    validateText(text) {
        if (!text || typeof text !== 'string') {
            throw new Error('Invalid input: Text must be a non-empty string');
        }

        if (text.length < MIN_TEXT_LENGTH) {
            throw new Error(`Text must be at least ${MIN_TEXT_LENGTH} characters long`);
        }

        return true;
    }
}

module.exports = TextService;