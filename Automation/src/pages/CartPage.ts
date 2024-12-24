
import { Page } from '@playwright/test';

class CartPage {
  private cartItems = '.inventory_item_name';
  private checkoutButton = '//a[text()="CHECKOUT"]';

  /**
   * @description returns the added cartItems
   * @author Ram
   * @async 
   * @param {Page} page
   * @returns {Promise<string[]>}
   */
  async getCartItems(page: Page): Promise<string[]> {
    try {
      await page.waitForSelector(this.cartItems);
      const items = await page.locator(this.cartItems).allTextContents();
      return items;
    } catch (error) {
      console.log('Unable to get Cart Items:', error);
    }
  }
  
  /**
   * @description clicks on the checkoutButton
   * @author Ram
   * @async
   * @param {Page} page
   */
  async checkout(page: Page) {
    await page.locator(this.checkoutButton).click();
  }
}
export default new CartPage;