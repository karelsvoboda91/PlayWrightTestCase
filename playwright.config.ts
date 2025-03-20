import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    workers: 2,
    reporter: 'html',
    projects: [
        {
            name: 'chromium',
            use: { 
                ...devices['Desktop Chrome'],
                baseURL: 'https://google.com',
                headless: false,
                screenshot: 'only-on-failure',
                video: 'retain-on-failure',
                viewport: { width: 1280, height: 720 },
                locale: 'en-EN'
             },
        }
    ],
});