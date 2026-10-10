import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 2,
  reporter: 'list',
  use: {
    baseURL: 'http://127.0.0.1:4173',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'Desktop Chrome',
      use: {
        ...devices['Desktop Chrome'],
        browserName: 'chromium',
      },
    },
    {
      name: 'Mobile Pixel',
      use: {
        ...devices['Pixel 5'],
        browserName: 'chromium',
      },
    },
    {
      name: 'Mobile iPhone SE',
      use: {
        ...devices['iPhone SE'],
        browserName: 'chromium',
      },
    },
  ],
  webServer: {
    command: 'npm run preview -- --port 4173 --host 127.0.0.1',
    port: 4173,
    reuseExistingServer: true,
    timeout: 60000,
  },
});
