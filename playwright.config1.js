const { devices } = require("@playwright/test");
const { permission } = require("node:process");

// @ts-check
const config = {
  testDir: './tests',
  retries: 1,   //failed tests will retry for 1 more time
  workers: 3,

  use:{  //action Timeouts globally
    actionTimeout: 10 * 1000,
    navigationTimeout: 60 * 1000,
  },
  /*Maximin timeout test can run for */
  timeout: 30 * 1000,

  expect: {   //golbal level timeout overriding here
    timeout: 5000,
  },
  reporter: 'html',
  projects: [
    {
      name: 'safari', // Merged name and use into one object
      use: {
        browserName: 'webkit',
        headless: false,
        screenshot: 'off',
        trace: 'on',
        ...devices['iPhone 14 Pro Max'], // Note: Playwright currently supports up to iPhone 15 series in default devices
      }
    },
    {
      name: 'chrome', // Merged name and use into one object
      use: {
        browserName: 'chromium',
        headless: false,
        screenshot: 'on',
        video: 'retain-on-failure',
        trace: 'on', 
        //viewport: { width: 720, height: 720 }, // Fixed typo 'heigh' to 'height' and changed 'visualViewport' to 'viewport'
        ignoreHTTPSError: true,
        permission: ['geolocation'],
      }
    }
  ],
};

module.exports = config;