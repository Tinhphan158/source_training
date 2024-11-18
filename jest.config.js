module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.jsx?$': 'babel-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(png|jpg|webp|ttf|woff|woff2|svg|mp4|gif)$': '<rootDir>/src/__mocks__/functionMocks/mediaMock.js',
  },
  testMatch: ['**/__tests__/**/*.(test|spec).(ts|tsx)'],
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  watchPathIgnorePatterns: ['<rootDir>/node_modules/'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,jsx}'],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  experimentalEsm: true,
  setupFilesAfterEnv: ['./jest.setup.js'],
};
