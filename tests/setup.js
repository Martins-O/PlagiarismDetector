jest.setTimeout(10000); // Set timeout to 10 seconds

// Mock the logger to avoid console output during tests
jest.mock('../src/utils/logger', () => ({
    info: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
    warn: jest.fn()
}));

// Setup dotenv for tests
require('dotenv').config();

// Global beforeEach to clear all mocks
beforeEach(() => {
    jest.clearAllMocks();
});