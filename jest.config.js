// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  clearMocks: true,
  coverageDirectory: 'coverage',
  globals: {
    'ts-jest': {
      diagnostics: {
        warnOnly: true,
      },
    },
  },
  notify: true,
  notifyMode: 'failure-change',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  rootDir: '.',
  testEnvironment: 'node',
  testMatch: ['**/**/*.test.ts'],
  verbose: true,
};
