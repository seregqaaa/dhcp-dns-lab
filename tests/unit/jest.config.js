const path = require('path')

module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  rootDir: path.join(__dirname, '../../'),
  testEnvironment: 'jsdom',
  setupFiles: [path.join(__dirname, './mocks.js')]
}
