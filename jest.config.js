module.exports = {
  testEnvironment: 'jsdom', // Specifies the test environment (e.g., jsdom, node)
  verbose: true, // Shows detailed output of test results
  moduleFileExtensions: ['js', 'jsx'], // Specifies the file extensions to include when running tests
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'], // Specifies the test file patterns
  setupFilesAfterEnv: ['./setupTests.js'], // Specifies the setup file(s) to run before each test
};
