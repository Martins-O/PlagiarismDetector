const request = require('supertest');
const app = require('../../src/api/server');

describe('Plagiarism API Integration Tests', () => {
    describe('POST /api/plagiarism/check', () => {
        it('should check text for plagiarism', async () => {
            const response = await request(app)
                .post('/api/plagiarism/check')
                .send({
                    text: 'This is a test text for plagiarism checking'
                });

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('totalMatches');
            expect(response.body).toHaveProperty('matches');
        });

        it('should handle empty text', async () => {
            const response = await request(app)
                .post('/api/plagiarism/check')
                .send({
                    text: ''
                });

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('error');
        });

        it('should handle missing text', async () => {
            const response = await request(app)
                .post('/api/plagiarism/check')
                .send({});

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('error');
        });

        it('should handle large texts', async () => {
            const largeText = 'a'.repeat(10000);
            const response = await request(app)
                .post('/api/plagiarism/check')
                .send({ text: largeText });

            expect(response.status).toBe(200);
        });
    });

    describe('POST /api/plagiarism/threshold', () => {
        it('should update similarity threshold', async () => {
            const response = await request(app)
                .post('/api/plagiarism/threshold')
                .send({ threshold: 85 });

            expect(response.status).toBe(200);
            expect(response.body.threshold).toBe(85);
        });

        it('should reject invalid threshold values', async () => {
            const response = await request(app)
                .post('/api/plagiarism/threshold')
                .send({ threshold: 101 });

            expect(response.status).toBe(400);
        });
    });

    describe('POST /api/plagiarism/bulk-check', () => {
        it('should handle multiple texts', async () => {
            const response = await request(app)
                .post('/api/plagiarism/bulk-check')
                .send({
                    texts: [
                        'First test text',
                        'Second test text'
                    ]
                });

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBe(2);
        });

        it('should handle empty array', async () => {
            const response = await request(app)
                .post('/api/plagiarism/bulk-check')
                .send({ texts: [] });

            expect(response.status).toBe(200);
            expect(response.body).toEqual([]);
        });
    });
});