import loginData from '../../test-data/login.json';
import medData from '../../test-data/medicine.json';
import { expect, test } from '../../src/fixtures/testFixtures';

test('@regression search medicine and add to cart', async ({ loginPage, shopPage }) => {
  await loginPage.goTo();
  await loginPage.loginAs(loginData.validUser.username, loginData.validUser.password);

  await shopPage.openShop();
  const { productName } = await shopPage.searchAndAddByCategory(
    medData.medicineName.searchTerm,
  );

  await shopPage.openCart();

  const names = await shopPage.cartItemNames().allTextContents();
  expect(names).toContain(productName);
  expect(productName.length).toBeGreaterThan(0);
});
