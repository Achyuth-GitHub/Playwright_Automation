// @ts-check
const config = {
  testDir: './tests',
  retries: 1,
  workers: 3,
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  reporter: 'html',
  projects: [
    {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        headless: false,
        actionTimeout: 5000,
        navigationTimeout: 6000,
        screenshot: 'on',
        video: 'retain-on-failure',
        trace: 'on',
        ignoreHttpsErrors: true,
        permissions: ['geolocation'],
      },
    },
  ],
};

module.exports = config;