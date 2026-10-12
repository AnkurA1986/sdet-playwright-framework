import { appConstants } from '../../src/constants/appConstants';
import loginData from '../../test-data/login.json';
import { expect, test } from '../../src/fixtures/testFixtures';

test('@regression browse medicines opens search medicines page', async ({
  loginPage,
  shopPage,
}) => {
  await shopPage.goTo();
  await shopPage.nav.openSignIn();
  const home = await loginPage.loginAs(
    loginData.validUser.username,
    loginData.validUser.password,
  );

  const searchPage = await home.clickBrowseMedicines();

  await expect(searchPage.shopHeading()).toHaveText(appConstants.shopPageHeading);
  await expect(searchPage.page).toHaveURL(/products\.html/);
});
