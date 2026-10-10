import { Locator, Page } from '@playwright/test';
import { env } from '../config/env';

export abstract class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
    page.setDefaultTimeout(env.defaultTimeout);
  }

  protected async click(locator: Locator): Promise<void> {
    await locator.click();
  }

  protected async fill(locator: Locator, value: string): Promise<void> {
    await locator.fill(value);
  }

  protected async waitForVisible(locator: Locator): Promise<void> {
    await locator.waitFor({ state: 'visible' });
  }
}
