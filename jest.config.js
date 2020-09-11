// We test only the libraries, not the demo code
module.exports = {
  verbose: true,
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  modulePathIgnorePatterns: [
    '<rootDir>/dist/',
    '<rootDir>/src/packages&/@nyaf/cli/',
    '<rootDir>/src/packages&/@nyaf/ui/',
    '<rootDir>/src/packages&/@nyaf/yo/',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  modulePaths: [
    '/src/packages/@nyaf/',
    '/src/packages/@nyaf/lib/',
    '/src/packages/@nyaf/forms/',
    '/src/packages/@nyaf/store/'
  ],
  "moduleNameMapper": {
    "^@nyaf/lib$": "<rootDir>/src/packages/@nyaf/lib"
  }
}