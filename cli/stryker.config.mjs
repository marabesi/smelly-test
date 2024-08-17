// @ts-check
/** @type {import('@stryker-mutator/api/core').PartialStrykerOptions} */
const config = {
  packageManager: "npm",
  reporters: ["html", "clear-text", "progress", "dashboard"],
  testRunner: "mocha",
  coverageAnalysis: "perTest",
  "checkers": ["typescript"],
  "tsconfigFile": "tsconfig.json",
  "typescriptChecker": {
    "prioritizePerformanceOverAccuracy": true
  },
  buildCommand: "npm run compile-tests",
  "mochaOptions": {
    "spec": ["out/src/test/**/*.js"],
    "package": "package.json",
    "ui": "bdd",
    "async-only": false,
    "grep": ".*"
  }
};
export default config;
