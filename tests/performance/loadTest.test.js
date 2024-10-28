const PlagiarismController = require('../../src/controller/PlagiarismController');

describe('Performance Tests', () => {
    it('should handle concurrent requests', async () => {
        const controller = new PlagiarismController();
        const requests = Array(10).fill().map(() =>
            controller.detectPlagiarism('Test text for concurrent processing')
        );

        const results = await Promise.all(requests);
        expect(results).toHaveLength(10);
    });

    it('should process large text within timeout', async () => {
        const controller = new PlagiarismController();
        const largeText = 'a'.repeat(50000);

        await expect(async () => {
            await controller.detectPlagiarism(largeText);
        }).not.toThrow();
    }, 15000);
});
