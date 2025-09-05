module.exports = {
  testEnvironment: "node",
  transform: { "^.+\\.js$": "babel-jest" },
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.js", "!src/index.js"],
  verbose: true,
  testMatch: ["**/__tests__/**/*.test.js"],
  setupFiles: ["<rootDir>/__tests__/helpers/jest.env.setup.js"],
};
