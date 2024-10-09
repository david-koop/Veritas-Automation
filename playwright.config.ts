import { defineConfig, devices } from '@playwright/test';
import { configDotenv } from 'dotenv';
configDotenv();

// dotenv.config();


export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  
  timeout: 5*60*1000, // 5 min
  //? אם מגדירים טיים אאוט שונה מ0, צריך לדאוג לעדכן את הטיים אאוט בלוגין פייג שיהיה פחות מזה

  use: {
    headless: false,
    // baseURL: 'https://10.0.2.102',
    baseURL: 'https://34.165.52.158',
    // baseURL: 'https://ama.am-test.com',
    // baseURL: 'https://amproxy.ravtech.co.il',
    ignoreHTTPSErrors: true,
    trace: 'on-first-retry',
    launchOptions: {
      args: [ '--start-maximized' ],
      // slowMo: 50,
    },
    storageState: 'storageState.json',
    
  },


  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        // ...devices['Desktop Chrome'],
        deviceScaleFactor:undefined,
        viewport: null,
        launchOptions:{
          args: [ '--start-maximized' ],
        },
        storageState: 'storageState.json',
        
      },
      
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

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
  //   {
  //     name: 'Google Chrome',
  //     use: { ...devices['Desktop Chrome'], channel: 'chrome'},
  //   },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
