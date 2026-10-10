import { Locator, Page } from '@playwright/test';
import { BasePage } from '../base/BasePage';
import { paths } from '../config/paths';
import { HomePage } from './HomePage';

export class LoginPage extends BasePage {
  readonly email: Locator;
  readonly password: Locator;
  readonly signInButton: Locator;
  readonly errorBanner: Locator;
  readonly fillDemoButton: Locator;

  constructor(page: Page) {
    super(page);
    this.email = page.getByTestId('email_id');
    this.password = page.getByTestId('password_id');
    this.signInButton = page.getByTestId('signin_button');
    this.errorBanner = page.getByTestId('login_alert');
    this.fillDemoButton = page.getByTestId('fill_demo_button');
  }

  async goTo(): Promise<LoginPage> {
    await this.page.goto(paths.login);
    return this;
  }

  async enterCredentials(email: string, password: string): Promise<void> {
    await this.fill(this.email, email);
    await this.fill(this.password, password);
  }

  async clickSignIn(): Promise<void> {
    await this.click(this.signInButton);
  }

  async loginAs(email: string, password: string): Promise<HomePage> {
    await this.enterCredentials(email, password);
    await this.clickSignIn();
    const home = new HomePage(this.page);
    await home.waitForLoaded();
    return home;
  }

  async loginExpectingFailure(email: string, password: string): Promise<LoginPage> {
    await this.enterCredentials(email, password);
    await this.clickSignIn();
    await this.waitForVisible(this.errorBanner);
    return this;
  }

  async fillDemoCredentials(): Promise<void> {
    await this.click(this.fillDemoButton);
  }

  async fillDemoAndSubmit(): Promise<HomePage> {
    await this.fillDemoCredentials();
    await this.clickSignIn();
    const home = new HomePage(this.page);
    await home.waitForLoaded();
    return home;
  }
}
