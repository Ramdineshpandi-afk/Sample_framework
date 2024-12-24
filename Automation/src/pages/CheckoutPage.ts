
import { Page } from '@playwright/test';

class CheckoutPage {

  private firstNameInput = '#first-name';
  private lastNameInput = '#last-name';
  private postalCodeInput = '#postal-code';
  private continueButton = 'input[value="CONTINUE"]';
  private shippingInformationDetails = `//div[text()='Shipping Information:']/following-sibling::div[@Class='summary_value_label']`;
  private summaryInfo = 'div.summary_info';
  private subTotalInfo = 'div.summary_subtotal_label';
  private taxInfo = 'div.summary_tax_label';
  private totalInfo = '.summary_total_label';


  /**
   * @description fills the shipping information and proceeds to click continue button
   * @author Ram
   * @async
   * @param {string} firstName
   * @param {string} lastName
   * @param {string} postalCode
   * @param {Page} page
   */
  async fillShippingInformation(firstName: string, lastName: string, postalCode: string, page: Page) {
    await page.fill(this.firstNameInput, firstName);
    await page.fill(this.lastNameInput, lastName);
    await page.fill(this.postalCodeInput, postalCode);
    await page.click(this.continueButton);
  }

  /**
   * @description returns the shipping Informaton details
   * @author Ram
   * @async
   * @param {Page} page
   * @returns {Promise<string|null>}
   */
  async getShippingInformation(page: Page): Promise<string | null> {
    try{
    const ShippingInfo = await page.locator(this.shippingInformationDetails).textContent();
    return ShippingInfo;
    }
    catch(error){
      console.log('Unable to get Shipping Information', error);
      
    }
  }


  /**
   * @description returns the Total with subtotal and tax details
   * @author Ram
   * @async
   * @param {Page} page
   * @returns {Promise<(string|undefined)[]>}
   */
  async getPaymentInfomrmation(page: Page): Promise<(string | undefined)[]> {
    try {
      await page.waitForSelector(this.summaryInfo);
      await page.locator(this.summaryInfo).scrollIntoViewIfNeeded();
      const itemTotal = await page.locator(this.subTotalInfo).textContent();
      const tax = await page.locator(this.taxInfo).textContent();
      const total = await page.locator(this.totalInfo).textContent();
      return [itemTotal, tax, total].map((item) => item?.split('$')[1]);
    } catch (error) {
      console.log('Unable to get payment information', error);
      
    }
  }
}
export default new CheckoutPage;