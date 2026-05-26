// @ts-check
import { defineConfig, devices } from '@playwright/test';
require('dotenv').config({
  path: `.env.${process.env.TEST_ENV || 'qa'}`
})

export default defineConfig({
  testDir: './tests',

  expect:{
    timeout:15000,
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,

  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    trace: 'on-first-retry',
    baseURL : process.env.BASE_URL,
    headless: true,
  },

  /* Configure projects for major browsers */
  projects: [

    // Setup project
    { name: 'setup', testMatch: /.*\.setup\.js/ },
    {
      name: 'chromium',
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json',
      },
    },

    {
      name: 'firefox',
      dependencies: ['setup'],

      use: {
        ...devices['Desktop Firefox'],
        storageState: 'playwright/.auth/user.json',

      },

    },

    {
      name: 'webkit',
      dependencies: ['setup'],

      use: {
        ...devices['Desktop Safari'],
        storageState: 'playwright/.auth/user.json',

      },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

