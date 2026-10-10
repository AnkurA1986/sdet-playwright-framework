import type { VideoMode } from '@playwright/test';

const DEFAULT_BASE_URL = 'https://www.way2automation.com/MediShopWebApp/';

const VIDEO_MODES: VideoMode[] = ['off', 'on', 'retain-on-failure', 'on-first-retry'];

function parseVideoMode(value: string | undefined, defaultValue: VideoMode): VideoMode {
  if (value === undefined || value === '') {
    return defaultValue;
  }
  if (VIDEO_MODES.includes(value as VideoMode)) {
    return value as VideoMode;
  }
  return defaultValue;
}

function parseBoolean(value: string | undefined, defaultValue: boolean): boolean {
  if (value === undefined || value === '') {
    return defaultValue;
  }
  return value === 'true' || value === '1';
}

export const env = {
  baseURL: process.env.BASE_URL ?? DEFAULT_BASE_URL,
  headless: parseBoolean(process.env.HEADLESS, !!process.env.CI),
  defaultTimeout: Number(process.env.EXPLICIT_WAIT_MS ?? 30_000),
  isCI: !!process.env.CI,
  /** `on` = keep video for every test (pass and fail). */
  video: parseVideoMode(process.env.VIDEO, 'on'),
};
