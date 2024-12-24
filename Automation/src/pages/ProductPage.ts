import { Page } from '@playwright/test';
import { generateDynamicLocator } from '../testUtils';

class ProductPage {

  productHeader = '//div[text()="Products"]';
  private cartIcon = '.shopping_cart_link';
  private cartIcounCounter = '.shopping_cart_badge';
  private sortDropDown = 'select.product_sort_container';
  private producePrices = ".inventory_item_price";
  private sortDropDowntexts = `//option[text()='placeholder']`;
  private addToCartItemsButton = `//div[text()='placeholder']/ancestor::div[@class='inventory_item']//button[text()='ADD TO CART']`;
  private removeCartItemsButton = `//div[text()='placeholder']/ancestor::div[@class='inventory_item']//button[text()='REMOVE']`;


  /**
   * @description assign the sorting order in Sort Dropdown
   * @author Ram
   * @param {Page} page
   * @param {*} order
   */
  async sortItems(order: any, page: Page) {
    const reqLocator = await generateDynamicLocator(this.sortDropDowntexts, "placeholder", order);
    const optionValue = await page.locator(reqLocator).getAttribute('value');
    await page.locator(this.sortDropDown).selectOption(optionValue);
  }

  /**
   * @description adds items to the cart
   * @author Ram
   * @async
   * @param {string} itemName
   * @param {Page} page
   */
  async addItemToCart(itemName: string, page: Page) {
    const reqLocator = await generateDynamicLocator(this.addToCartItemsButton, "placeholder", itemName);
    await page.locator(reqLocator).click();
  }

  /**
   * @description removes the given added item
   * @author Ram
   * @async
   * @param {string} itemName
   * @param {Page} page
   */
  async removeItemFromCart(itemName: string, page: Page) {
    const reqLocator = await generateDynamicLocator(this.removeCartItemsButton, "placeholder", itemName);
    await page.locator(reqLocator).click();
  }

  /**
   * @description returns the no of items added in cart
   * @author Ram
   * @async
   * @param {Page} page
   * @returns {Promise<string | null>}
   */
  async getCartCount(page: Page): Promise<string | null> {
    try {
      const cartCount: any = page.locator(this.cartIcounCounter).textContent();
      return cartCount;
    } catch (error) {
      console.log('Unable to get cartcount:', error);
    }
  }

  /**
   * @description gets all the product prices from product page
   * @author Ram
   * @async
   * @param {Page} page
   * @returns {Promise<number[]>}
   */
  async getAllProductPrices(page: Page): Promise<number[]> {
    try {
      const prices: number[] = await page.$$eval(this.producePrices, (elements) =>
        elements.map((el) => parseFloat(el.textContent?.replace("$", "") || "0"))
      );
      return prices;
    }
    catch (error) {
      console.log('Unable to get all Product prices', error);
    }
  }

  /**
   * @description clicks on cartIcon
   * @author Ram
   * @async
   * @param {Page} page
   */
  async navigateToCart(page: Page) {
    await page.click(this.cartIcon);
  }

}
export default new ProductPage;
