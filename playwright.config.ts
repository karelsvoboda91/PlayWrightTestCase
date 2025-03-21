import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    workers: 1,
    reporter: 'html',
    projects: [
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'],
                baseURL: 'https://google.com',
                headless: true,
                screenshot: 'only-on-failure',
                video: 'retain-on-failure',
                viewport: { width: 1280, height: 720 },
                launchOptions: {
                    args: [
                      '--disable-blink-features=AutomationControlled',
                      '--disable-infobars',
                    ],
                  },
            },
        }
    ],
});