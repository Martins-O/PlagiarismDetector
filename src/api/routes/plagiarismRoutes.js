const express = require('express');
const router = express.Router();
const PlagiarismController = require('../../controller/plagiarismController');
const logger = require('../../utils/logger');

const controller = new PlagiarismController();

router.post('/check', async (req, res) => {
    try {
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({
                error: 'Text is required'
            });
        }

        const report = await controller.detectPlagiarism(text);
        res.json(report);
    } catch (error) {
        logger.error('API Error:', { error: error.message, stack: error.stack });
        res.status(500).json({
            error: error.message
        });
    }
});

router.post('/threshold', (req, res) => {
    try {
        const { threshold } = req.body;

        if (threshold === undefined || threshold < 0 || threshold > 100) {
            return res.status(400).json({
                error: 'Valid threshold (0-100) is required'
            });
        }

        controller.setSimilarityThreshold(threshold);
        res.json({ message: 'Threshold updated successfully', threshold });
    } catch (error) {
        logger.error('API Error:', { error: error.message, stack: error.stack });
        res.status(500).json({
            error: error.message
        });
    }
});

router.post('/bulk-check', async (req, res) => {
    try {
        const { texts } = req.body;

        if (!Array.isArray(texts)) {
            return res.status(400).json({
                error: 'Texts array is required'
            });
        }

        const reports = await Promise.all(
            texts.map(text => controller.detectPlagiarism(text))
        );

        res.json(reports);
    } catch (error) {
        logger.error('API Error:', { error: error.message, stack: error.stack });
        res.status(500).json({
            error: error.message
        });
    }
});

module.exports = router;