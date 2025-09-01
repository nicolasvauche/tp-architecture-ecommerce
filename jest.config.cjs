module.exports = {
  testEnvironment: "node",
  transform: { "^.+\\.js$": "babel-jest" },
  collectCoverageFrom: ["src/**/*.js", "!src/index.js"],
  verbose: true,
  testMatch: ["**/__tests__/**/*.test.js"],
};
