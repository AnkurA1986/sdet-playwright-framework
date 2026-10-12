import { Locator, Page } from '@playwright/test';
import { BasePage } from '../base/BasePage';
import { appConstants } from '../constants/appConstants';
import { NavComponent } from './components/NavComponent';

export class OrdersPage extends BasePage {
  readonly nav: NavComponent;
  private readonly pageHeading: Locator;

  constructor(page: Page) {
    super(page);
    this.nav = new NavComponent(page);
    this.pageHeading = page.locator(`//h1[text()='${appConstants.ordersPageHeading}']`);
  }

  async waitForLoaded(): Promise<void> {
    await this.waitForVisible(this.pageHeading);
  }

  ordersHeading(): Locator {
    return this.pageHeading;
  }
}
