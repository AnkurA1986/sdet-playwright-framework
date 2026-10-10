import { Locator, Page } from '@playwright/test';

export class NavComponent {
  readonly page: Page;
  readonly homeLink: Locator;
  readonly shopLink: Locator;
  readonly cartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.homeLink = page.getByTestId('nav_home');
    this.shopLink = page.getByTestId('nav_shop');
    this.cartButton = page.getByTestId('cart_button');
  }

  async openShop(): Promise<void> {
    await this.shopLink.click();
  }

  async openCart(): Promise<void> {
    await this.cartButton.click();
  }
}
