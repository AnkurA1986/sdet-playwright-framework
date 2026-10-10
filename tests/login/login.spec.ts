import loginData from '../../test-data/login.json';
import { expect, test } from '../../src/fixtures/testFixtures';

test('@smoke valid user can log in', async ({ loginPage }) => {
  await loginPage.goTo();
  const home = await loginPage.loginAs(
    loginData.validUser.username,
    loginData.validUser.password,
  );
  await expect(home.page).toHaveURL(/home\.html/);
  await expect(home.nav.homeLink).toBeVisible();
});

test('@regression login with invalid user shows error', async ({ loginPage }) => {
  await loginPage.goTo();
  await loginPage.loginExpectingFailure(
    loginData.invalidUser.username,
    loginData.invalidUser.password,
  );
  await expect(loginPage.errorBanner).toBeVisible();
});

test('@smoke login with demo autofill', async ({ loginPage }) => {
  await loginPage.goTo();
  const home = await loginPage.fillDemoAndSubmit();
  await expect(home.page).toHaveURL(/home\.html/);
  await expect(home.nav.homeLink).toBeVisible();
});
