import { defineConfig, devices } from '@playwright/test';
import dotenv from "dotenv";

export default defineConfig({
  testDir: './src/tests',

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : '50%',

  outputDir: 'reports/test-results',

  globalSetup: './src/globalSetup.ts',

  reporter: [['line'], ['html', { outputFolder: 'reports/playwright-reports' }]],

  use: {
    headless: true,

    baseURL: process.env[`${process.env.ENVIRONMENT}_BASE_URL`],

    trace: 'on-first-retry',
  },

  projects: [

    {
      name: 'chromium',

      use: { ...devices['Desktop Chrome'] },
    },
  ]
});
