// Configuración Jest SOLO para Backend (Node.js)
module.exports = {
  testEnvironment: 'node',
  rootDir: '.',
  testMatch: [
    '**/__tests__/**/*.test.js'
  ],
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/server.js',
    '!src/config/**'
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  },
  testPathIgnorePatterns: [
    '/node_modules/',
    '/__tests__/.*\\.skip\\.js$'
  ]
};