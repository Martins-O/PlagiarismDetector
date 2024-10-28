// app.js
const express = require('express');
const dotenv = require('dotenv');
const plagiarismRoutes = require('./src/api/routes/plagiarismRoutes');

dotenv.config(); // Load environment variables

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

// Use plagiarism routes
app.use('/api/plagiarism', plagiarismRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});