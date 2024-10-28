const PlagiarismController = require('../../../src/controller/PlagiarismController');
const SearchService = require('../../../src/services/SearchService');
const TextService = require('../../../src/services/TextService');

jest.mock('../../../src/services/SearchService');
jest.mock('../../../src/services/TextService');

describe('PlagiarismController', () => {
    let controller;
    let mockSearchService;
    let mockTextService;

    beforeEach(() => {
        mockSearchService = new SearchService();
        mockTextService = new TextService();
        controller = new PlagiarismController();

        // Reset controller's services with mocks
        controller.searchService = mockSearchService;
        controller.textService = mockTextService;
    });

    describe('detectPlagiarism', () => {
        it('should detect plagiarism successfully', async () => {
            const mockText = 'Test text for plagiarism';
            const mockSearchResults = [{
                title: 'Test Result',
                description: 'Similar text',
                url: 'http://test.com'
            }];

            mockTextService.validateText.mockReturnValue(true);
            mockSearchService.searchWeb.mockResolvedValue(mockSearchResults);
            mockTextService.calculateSimilarity.mockReturnValue(85);

            const report = await controller.detectPlagiarism(mockText);

            expect(report.totalMatches).toBe(1);
            expect(mockSearchService.searchWeb).toHaveBeenCalledWith(mockText);
            expect(mockTextService.calculateSimilarity).toHaveBeenCalled();
        });

        it('should handle validation errors', async () => {
            mockTextService.validateText.mockImplementation(() => {
                throw new Error('Invalid text');
            });

            await expect(controller.detectPlagiarism('')).rejects.toThrow('Invalid text');
        });
    });

    describe('setSimilarityThreshold', () => {
        it('should set valid threshold', () => {
            const validThreshold = 75;
            controller.setSimilarityThreshold(validThreshold);
            expect(controller.similarityThreshold).toBe(validThreshold);
        });

        it('should reject invalid threshold', () => {
            expect(() => controller.setSimilarityThreshold(101)).toThrow();
            expect(() => controller.setSimilarityThreshold(-1)).toThrow();
        });
    });
});