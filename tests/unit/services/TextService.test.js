const TextService = require('../../../src/services/TextService');

describe('TextService', () => {
    let textService;

    beforeEach(() => {
        textService = new TextService();
    });

    describe('calculateSimilarity', () => {
        test('should return 100 for identical texts', () => {
            const text = 'This is a test text';
            const similarity = textService.calculateSimilarity(text, text);
            expect(similarity).toBe(100);
        });

        test('should return low similarity for different texts', () => {
            const text1 = 'This is a test text';
            const text2 = 'This is a completely different text';
            const similarity = textService.calculateSimilarity(text1, text2);
            expect(similarity).toBeLessThan(60);
        });
    });

    describe('validateText', () => {
        test('should throw error for empty text', () => {
            expect(() => textService.validateText('')).toThrow();
        });

        test('should throw error for text below minimum length', () => {
            expect(() => textService.validateText('short')).toThrow();
        });

        test('should return true for valid text', () => {
            const result = textService.validateText('This is a sufficiently long text for validation purposes');
            expect(result).toBe(true);
        });
    });

    describe('TextService edge cases', () => {
        it('should handle texts with special characters', () => {
            const text1 = 'Hello, world! How are you?';
            const text2 = 'Hello world How are you';
            const similarity = textService.calculateSimilarity(text1, text2);
            expect(similarity).toBeGreaterThan(90);
        });

        it('should handle texts with different case', () => {
            const text1 = 'HELLO WORLD';
            const text2 = 'hello world';
            const similarity = textService.calculateSimilarity(text1, text2);
            expect(similarity).toBe(100);
        });

        it('should handle texts with extra whitespace', () => {
            const text1 = '  Hello   world  ';
            const text2 = 'Hello world';
            const similarity = textService.calculateSimilarity(text1, text2);
            expect(similarity).toBe(100);
        });

        it('should handle non-ASCII characters', () => {
            const text1 = 'Hello with émojis 🎉';
            const text2 = 'Hello with emojis';
            const similarity = textService.calculateSimilarity(text1, text2);
            expect(similarity).toBeGreaterThan(80);
        });
    });
});