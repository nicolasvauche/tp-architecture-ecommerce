/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: "node",
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.js", "!src/index.js"],
  setupFiles: ["<rootDir>/__tests__/helpers/jest.env.setup.js"],
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  testMatch: ["**/__tests__/**/*.test.js"],
  resetMocks: true,
  restoreMocks: true,
  clearMocks: true,
};
