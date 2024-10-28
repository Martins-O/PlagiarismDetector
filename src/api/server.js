const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const plagiarismRoutes = require('./routes/plagiarismRoutes');
const rateLimiter = require('./middleware/rateLimiter');
const logger = require('../utils/logger');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(rateLimiter);

// Routes
app.use('/api/plagiarism', plagiarismRoutes);

// Error handling
app.use((err, req, res, next) => {
    logger.error('Server Error:', { error: err.message, stack: err.stack });
    res.status(500).json({
        error: 'Internal server error'
    });
});

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});

module.exports = app;