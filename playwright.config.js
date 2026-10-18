// @ts-check
const config = {
  testDir: './tests',
  retries: 1,
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
      name: 'chrome',
      use: {
        browserName: 'chromium',
        headless: false,
        //actionTimeout: 5000,
        //navigationTimeout: 6000,
        screenshot: 'on',
        //video: 'retain-on-failure',
        //trace: 'retain-on-failre',
        trace: 'on',
        //ignoreHttpsErrors: true,
        //permissions: ['geolocation'],
      },
    },
  ],
};

module.exports = config;