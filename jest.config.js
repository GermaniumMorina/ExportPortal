module.exports = {
  transform: {
    "^.+\\.jsx?$": "babel-jest"
  },
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
  
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "axios": "axios/dist/node/axios.cjs",
    "\\.(png|jpg|jpeg|gif|svg)$": "<rootDir>/empty-module.js"


  }
};
