import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest', 
  testEnvironment: 'node', 
  testMatch: ['**/*.test.ts'], 
  testPathIgnorePatterns: ['/node_modules/'], 
};

export default config;
