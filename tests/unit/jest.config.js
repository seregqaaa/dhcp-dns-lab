const path = require('path')

module.exports = {
  collectCoverage: true,
  coverageDirectory: path.join(__dirname, '../../.coverage/unit'),
  collectCoverageFrom: [
    'src/components/**/*.vue',
    'src/store/**/*.js',
    'src/router/**/*.js',
    'src/utils/**/*.js',
    'src/api/**/*.js'
  ],
  preset: '@vue/cli-plugin-unit-jest',
  rootDir: path.join(__dirname, '../../'),
  testEnvironment: 'jsdom',
  setupFiles: [path.join(__dirname, './mocks.js')]
}
