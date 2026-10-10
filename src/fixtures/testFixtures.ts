import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ShopPage } from '../pages/ShopPage';

type FrameworkFixtures = {
  loginPage: LoginPage;
  shopPage: ShopPage;
};

export const test = base.extend<FrameworkFixtures>({
  loginPage: async ({ page }, use, testInfo) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
    if (testInfo.status !== testInfo.expectedStatus) {
      console.error(`Failed: ${testInfo.title}`);
    }
  },
  shopPage: async ({ page }, use) => {
    await use(new ShopPage(page));
  },
});

export { expect } from '@playwright/test';
