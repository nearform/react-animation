module.exports = {
  verbose: true,
  setupTestFrameworkScriptFile: '<rootDir>/src/setupTests.js',
  moduleNameMapper: {
    '.+\\.(css|png|jpg)$': 'identity-obj-proxy'
  },
  coverageReporters: ['json-summary', 'text', 'lcov'],
  collectCoverage: true,
  setupFiles: ['./__mocks__/client.js'],
  testEnvironment: 'jsdom'
}
