import { defineConfig } from '@playwright/test';
import { env } from './src/config/env';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: env.isCI,
  retries: env.isCI ? 2 : 0,
  workers: env.isCI ? 1 : 1,
  timeout: env.defaultTimeout,
  expect: {
    timeout: env.defaultTimeout,
  },
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['./src/reporters/testLogReporter.ts'],
  ],

  use: {
    baseURL: env.baseURL,
    trace: 'on-first-retry',
    headless: env.headless,
    screenshot: 'only-on-failure',
    video: env.video,
  },

  projects: [
    {
      name: 'chromium',
      use: {
        viewport: null,
        launchOptions: { args: ['--start-maximized'] },
      },
    },
  ],
});
