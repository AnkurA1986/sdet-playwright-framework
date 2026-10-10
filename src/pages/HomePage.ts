import { Page } from '@playwright/test';
import { BasePage } from '../base/BasePage';
import { NavComponent } from './components/NavComponent';

export class HomePage extends BasePage {
  readonly nav: NavComponent;

  constructor(page: Page) {
    super(page);
    this.nav = new NavComponent(page);
  }

  async waitForLoaded(): Promise<void> {
    await this.waitForVisible(this.nav.homeLink);
  }
}
