import { Locator, Page } from '@playwright/test';
import { BasePage } from '../base/BasePage';
import { appConstants } from '../constants/appConstants';
import { paths } from '../config/paths';
import { NavComponent } from './components/NavComponent';

export type SearchAndAddResult = {
  productName: string;
};

export class ShopPage extends BasePage {
  readonly nav: NavComponent;
  private readonly pageHeading: Locator;
  private readonly searchBox: Locator;
  private readonly productCards: Locator;
  private readonly toastMessage: Locator;
  private readonly cartItems: Locator;
  private readonly cartItemName: Locator;
  private readonly prodType: Locator;

  constructor(page: Page) {
    super(page);
    this.nav = new NavComponent(page);
    this.pageHeading = page.locator(`//h1[text()='${appConstants.shopPageHeading}']`);
    this.searchBox = page.getByTestId('product_search_input');
    this.productCards = page.locator('.product-card');
    this.toastMessage = page.locator('.toast.toast-success');
    this.cartItems = page.locator('#cart_items');
    this.cartItemName = page.locator('#cart_items tr a');
    this.prodType = page.locator('.product-cat');
  }

  async goTo(): Promise<ShopPage> {
    await this.page.goto(paths.products);
    await this.waitForLoaded();
    return this;
  }

  async waitForLoaded(): Promise<void> {
    await this.waitForVisible(this.pageHeading);
  }

  shopHeading(): Locator {
    return this.pageHeading;
  }

  async openShop(): Promise<ShopPage> {
    await this.nav.openShop();
    await this.waitForLoaded();
    return this;
  }

  async searchAndAddByCategory(searchType: string): Promise<SearchAndAddResult> {
    await this.searchBox.clear();
    await this.fill(this.searchBox, searchType);
    await this.page.keyboard.press('Enter');
    await this.productCards.first().waitFor({ state: 'visible' });

    const productCount = await this.productCards.count();
    if (productCount === 0) {
      throw new Error(`${searchType} medicine not found`);
    }

    const prodTypeCount = await this.prodType.count();
    let productName = '';

    for (let i = 0; i < prodTypeCount; i++) {
      const text = (await this.prodType.nth(i).textContent()) ?? '';
      if (text.toLowerCase() === searchType.toLowerCase()) {
        productName = (await this.productCards.nth(i).locator('h3').textContent()) ?? '';
        await this.productCards.nth(i).locator('.product-foot button').click();
        break;
      }
    }

    if (!productName) {
      throw new Error(`No product matched category "${searchType}"`);
    }

    await this.toastMessage.waitFor({ state: 'visible' });
    return { productName };
  }

  async openCart(): Promise<void> {
    await this.nav.openCart();
    await this.cartItems.first().waitFor({ state: 'visible' });
  }

  cartItemNames(): Locator {
    return this.cartItemName;
  }
}
