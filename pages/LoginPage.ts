import { expect, Page } from '@playwright/test';

export class LoginPage {
  // Locators
  private readonly usernameInput;
  private readonly passwordInput;
  private readonly loginButton;
  private readonly errorMessage;

  constructor(private readonly page: Page) {
    this.usernameInput = this.page.getByLabel('Username');
    this.passwordInput = this.page.getByLabel('Password');
    this.loginButton = this.page.getByRole('button', { name: 'Login'});
    this.errorMessage = this.page.getByRole('alert');
  }

  // Navigate to login page
  async navigate(): Promise<void> {
    await this.page.goto('https://www.saucedemo.com/');
  }

  // User Login
  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async verifyLoginError(message: string): Promise<void> {
    await expect(this.errorMessage).toContainText(message);
  }

  async verifyLoginPageDisplayed(): Promise<void> {
    await expect(this.loginButton).toBeVisible();
  }
}
