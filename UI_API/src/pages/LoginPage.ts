
import { Page } from '@playwright/test';

class LoginPage {
  private usernameInput = '#user-name';
  private passwordInput = '#password';
  private loginButton = '#login-button';
  private errorMessage = '[data-test="error"]';

  /**
   * @description navigates to login page
   * @author Ram
   * @private
   * @async
   * @param {Page} page
   */
  private async navigateToLogin(page:Page) {
    await page.goto('/v1/index.html');
  }

  /**
   * @description fills the login credentials and clicks on login button
   * @author Ram
   * @async
   * @param {string} username
   * @param {string} password
   * @param {Page} page
   */
  async login(username: string, password: string, page: Page) {
    await this.navigateToLogin(page);
    await page.fill(this.usernameInput, username);
    await page.fill(this.passwordInput, password);
    await page.click(this.loginButton);
  }

  /**
   * @description returns the error message from login page
   * @author Ram
   * @async
   * @param {Page} page
   * @returns {Promise<string | null>}
   */
  async getErrorMessage(page: Page): Promise<string | null> {
    return page.locator(this.errorMessage).textContent();
  }
}
export default new LoginPage;
