import { Locator, Page } from '@playwright/test';
import { BasePage } from '../base/BasePage';
import { NavComponent } from './components/NavComponent';
import { OrdersPage } from './OrdersPage';
import { ShopPage } from './ShopPage';

export class HomePage extends BasePage {
  readonly nav: NavComponent;
  private readonly browseMedicinesButton: Locator;

  constructor(page: Page) {
    super(page);
    this.nav = new NavComponent(page);
    this.browseMedicinesButton = page.getByTestId('hero_shop_button');
  }

  async waitForLoaded(): Promise<void> {
    await this.waitForVisible(this.nav.homeLink);
  }

  async clickBrowseMedicines(): Promise<ShopPage> {
    await this.click(this.browseMedicinesButton);
    const shopPage = new ShopPage(this.page);
    await shopPage.waitForLoaded();
    return shopPage;
  }

  async openOrders(): Promise<OrdersPage> {
    await this.nav.openOrders();
    const ordersPage = new OrdersPage(this.page);
    await ordersPage.waitForLoaded();
    return ordersPage;
  }
}
