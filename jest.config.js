module.exports = {
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'lcov', 'clover', 'json-summary', 'html'],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 85,
            lines: 90,
            statements: 90
        }
    },
    testEnvironment: 'node',
    testMatch: [
        '**/tests/**/*.test.js'
    ],
    setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
    verbose: true,
    maxWorkers: '50%',
    reporters: [
        'default',
        ['jest-junit', {
            outputDirectory: 'test-report',
            outputName: 'junit.xml',
        }],
        ['jest-stare', {
            resultDir: 'test-report',
            reportTitle: 'Test Report',
            theme: 'dark',  // Enables dark mode
            coverageLink: './coverage/lcov-report/index.html' // Link to coverage report
        }]
    ]
};