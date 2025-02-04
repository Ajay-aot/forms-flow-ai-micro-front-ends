module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(j|t)sx?$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(css)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom","<rootDir>/jest.setup.js"],
  "moduleNameMapper": {
    "@formsflow/service": "<rootDir>/__mocks__/@formsflow/service.js"
  }
};
