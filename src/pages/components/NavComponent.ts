import { Locator, Page } from '@playwright/test';

export class NavComponent {
  readonly page: Page;
  readonly homeLink: Locator;
  readonly shopLink: Locator;
  readonly cartButton: Locator;
  readonly signInLink: Locator;
  readonly ordersLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.homeLink = page.getByTestId('nav_home');
    this.shopLink = page.getByTestId('nav_shop');
    this.ordersLink = page.getByTestId('nav_orders');
    this.cartButton = page.getByTestId('cart_button');
    this.signInLink = page.getByTestId('header_login_link');
  }

  async openShop(): Promise<void> {
    await this.shopLink.click();
  }

  async openCart(): Promise<void> {
    await this.cartButton.click();
  }

  async openSignIn(): Promise<void> {
    await this.signInLink.click();
  }

  async openOrders(): Promise<void> {
    await this.ordersLink.click();
  }
}
