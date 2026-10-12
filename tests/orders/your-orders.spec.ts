import { appConstants } from '../../src/constants/appConstants';
import loginData from '../../test-data/login.json';
import { expect, test } from '../../src/fixtures/testFixtures';

test('@regression orders nav opens your orders page', async ({ loginPage }) => {
  await loginPage.goTo();
  const home = await loginPage.loginAs(
    loginData.validUser.username,
    loginData.validUser.password,
  );

  const ordersPage = await home.openOrders();

  await expect(ordersPage.ordersHeading()).toHaveText(appConstants.ordersPageHeading);
  await expect(ordersPage.page).toHaveURL(/orders\.html/);
});
