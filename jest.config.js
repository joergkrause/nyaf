// We test only the libraries, not the demo code
module.exports = {
  verbose: true,
  roots: ['<rootDir>/src/packages/@nyaf'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
}