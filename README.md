# Plagiarism Detector

A robust Node.js application that detects plagiarism by comparing input text against web content using advanced text similarity algorithms and the Contextual Web Search API.

## 🚀 Features

- Text similarity analysis using Levenshtein distance algorithm
- Web content comparison using Contextual Web Search API
- REST API endpoints for single and bulk text checking
- Configurable similarity threshold
- Comprehensive logging system
- Rate limiting and security features
- Unit tests with Jest
- Docker support

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (version 14 or higher)
- npm (version 6 or higher)
- A RapidAPI key for Contextual Web Search API

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/plagiarism-detector.git
cd plagiarism-detector
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Configure your environment variables in `.env`:
```env
RAPID_API_KEY=your_api_key_here
SIMILARITY_THRESHOLD=80
LOG_LEVEL=info
PORT=3000
```

## 🚦 Usage

### Starting the Server

Development mode with hot reload:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

### API Endpoints

#### Check Single Text
```bash
POST /api/plagiarism/check
Content-Type: application/json

{
    "text": "Text to check for plagiarism"
}
```

#### Bulk Check
```bash
POST /api/plagiarism/bulk-check
Content-Type: application/json

{
    "texts": [
        "First text to check",
        "Second text to check"
    ]
}
```

#### Update Similarity Threshold
```bash
POST /api/plagiarism/threshold
Content-Type: application/json

{
    "threshold": 85
}
```

### Example Response

```json
{
    "originalText": "Text to check for plagiarism",
    "totalMatches": 2,
    "matches": [
        {
            "title": "Source Title",
            "url": "https://source-url.com",
            "similarity": "85.5",
            "matchedText": "Similar text found"
        }
    ],
    "timestamp": "2024-10-28T10:00:00.000Z"
}
```

## 🧪 Testing

Run all tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

Generate coverage report:
```bash
npm run test:coverage
```

## 📁 Project Structure

```
plagiarism-detector/
├── src/
│   ├── api/
│   │   ├── routes/
│   │   │   └── plagiarismRoutes.js
│   │   ├── middleware/
│   │   │   └── rateLimiter.js
│   │   └── server.js
│   ├── config/
│   │   ├── index.js
│   │   └── constants.js
│   ├── services/
│   │   ├── SearchService.js
│   │   └── TextService.js
│   ├── utils/
│   │   ├── logger.js
│   │   └── textNormalizer.js
│   ├── models/
│   │   └── PlagiarismReport.js
│   └── controllers/
│       └── PlagiarismController.js
├── tests/
│   ├── unit/
│   │   ├── services/
│   │   └── controllers/
│   └── integration/
├── docs/
├── logs/
└── examples/
```

## 🔒 Security Features

- Rate limiting to prevent abuse
- Helmet.js for HTTP security headers
- CORS protection
- Input validation
- Error handling
- Request size limits

## 🐳 Docker Support

Build the image:
```bash
docker build -t plagiarism-detector .
```

Run the container:
```bash
docker run -p 3000:3000 --env-file .env plagiarism-detector
```

## 📊 Monitoring and Logging

Logs are stored in the `logs` directory:
- `error.log`: Error-level logs
- `combined.log`: All logs

Log format:
```json
{
    "timestamp": "2024-10-28T10:00:00.000Z",
    "level": "info",
    "message": "Log message",
    "metadata": {}
}
```

## ⚡ Performance Considerations

- Text similarity calculations are optimized for speed
- Rate limiting prevents server overload
- Configurable thresholds for different use cases
- Bulk processing support for multiple texts

## 🔄 API Rate Limits

- 100 requests per IP address per 15 minutes
- Maximum request size: 1MB
- Configurable through environment variables

## 🛠️ Troubleshooting

Common issues and solutions:

1. API Key Issues:
   - Ensure RAPID_API_KEY is correctly set in .env
   - Verify API key is active and has sufficient credits

2. Performance Issues:
   - Check LOG_LEVEL in .env
   - Monitor logs/error.log for issues
   - Verify server resources

3. Rate Limiting:
   - Increase limits in rateLimiter.js if needed
   - Implement caching for frequent requests

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Martins O Jojolola - *Initial work* - [MartinsGit](https://github.com/Martins-O)

## 🙏 Acknowledgments

- Contextual Web Search API by RapidAPI
- Node.js community
- All contributors

## 📞 Support

For support, email jojololamartins686@gmail.com or create an issue in the repository.
