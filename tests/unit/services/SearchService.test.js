const SearchService = require('../../../src/services/SearchService');
const axios = require('axios');

jest.mock('axios');

describe('SearchService', () => {
    let searchService;

    beforeEach(() => {
        searchService = new SearchService();
    });

    describe('searchWeb', () => {
        test('should return search results', async () => {
            const mockResults = {
                data: {
                    value: [
                        { title: 'Test Result', description: 'Test Description', url: 'http://test.com' }
                    ]
                }
            };

            axios.get.mockResolvedValue(mockResults);

            const results = await searchService.searchWeb('test text');
            expect(results).toEqual(mockResults.data.value);
        });

        test('should handle API errors', async () => {
            axios.get.mockRejectedValue(new Error('API Error'));

            await expect(searchService.searchWeb('test text')).rejects.toThrow();
        });
    });
});