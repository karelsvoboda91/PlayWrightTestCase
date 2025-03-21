import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  workers: 2,
  reporter: 'html',
  projects: [
    {
      name: 'chromium',
      testMatch: 'tests/*.gui.spec.ts',
      grep: /@chromium/,
      use: {
        ...devices['Desktop Chrome'],
        headless: true,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        viewport: { width: 1280, height: 720 },
        geolocation: { latitude: 50.0755, longitude: 14.4378 }, // czech location
        permissions: ['geolocation'],
        launchOptions: {
          args: [
            '--disable-blink-features=AutomationControlled', // avoid captcha
            '--disable-infobars',
          ],
        },
      },
    },
    {
      name: 'Firefox',
      testMatch: 'tests/*.gui.spec.ts',
      grep: /@firefox/,
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'Safari',
      testMatch: 'tests/*.gui.spec.ts',
      grep: /@safari/,
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      testMatch: 'tests/*.gui.spec.ts',
      grep: /@mobileChrome/,
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      testMatch: 'tests/*.gui.spec.ts',
      grep: /@mobileSafari/,
      use: { ...devices['iPhone 12'] },
    },
    {
      name: 'api',
      testMatch: 'tests/*.api.spec.ts',
    },
  ],
});
