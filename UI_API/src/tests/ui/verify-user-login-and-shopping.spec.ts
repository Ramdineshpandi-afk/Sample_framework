import { test, expect } from '@playwright/test';
import LoginPage from '../../pages/LoginPage';
import validUsers from "../../testData/validUsers.json";
import lockedUsers from "../../testData/lockedUsers.json";
import products from "../../testData/products.json";
import ProductPage from '../../pages/ProductPage';
import CartPage from '../../pages/CartPage';
import { areArraysIdentical, checkPriceOrder } from '../../helper';
import CheckoutPage from '../../pages/CheckoutPage';


test.describe('User Login and Account Management', async () => {

  // TC-001: User successfully logs in
  test('should login successfully with valid credentials', async ({ page }) => {

    await LoginPage.login(validUsers.username, validUsers.password, page);

    await expect(page).toHaveURL(/inventory\.html/);

    await expect(page.locator(ProductPage.productHeader)).toBeVisible();

  });

  // TC-002: Locked User Login
  test('should show error for locked-out user', async ({ page }) => {

    await LoginPage.login(lockedUsers.username, lockedUsers.password, page);

    const errorMessage = await LoginPage.getErrorMessage(page);

    expect(errorMessage).toContain(lockedUsers.expectedMessage);

  });

});

test.describe('Product Listing and Sorting', async () => {

  // TC-003: Sort Items by Price (Lowest to Highest)
  test('User should be able to sort items by price (Lowest to Highest)', async ({ page }) => {

    await LoginPage.login(validUsers.username, validUsers.password, page);

    await ProductPage.sortItems(products['sortOrder']['value'], page);

    const actualprices = await ProductPage.getAllProductPrices(page);

    expect(checkPriceOrder(actualprices, products['sortOrder']['order'])).toBe(true);

  });
});


test.describe('Basket Management', async () => {

  // TC-004: Add 3 Items to Basket
  test('should add 3 items to the basket', async ({ page }) => {

    await LoginPage.login(validUsers.username, validUsers.password, page);

    for (let product of products['addCartItems']) {
      await ProductPage.addItemToCart(product, page);
    }

    const cartCount = await ProductPage.getCartCount(page);

    expect(cartCount).toBe('3');

  });

  // TC-005: Remove Item from Basket
  test('should remove an item from the basket', async ({ page }) => {

    await LoginPage.login(validUsers.username, validUsers.password, page);

    for (let product of products['addCartItems']) {
      await ProductPage.addItemToCart(product, page);
    }

    const cartCount = await ProductPage.getCartCount(page);

    expect(cartCount).toBe(`${products['addCartItems'].length}`);

    for (let product of products['removeCartItem']) {
      await ProductPage.removeItemFromCart(product, page);
    }

    const cartCountAfterRemoval = await ProductPage.getCartCount(page);

    expect(cartCountAfterRemoval).toBe(`${products['addCartItems'].length - 1}`);

  });

});

test.describe('Checkout Process', async () => {

  // TC-006: Proceed to Checkout  
  test('should be able to checkout', async ({ page }) => {

    await LoginPage.login(validUsers.username, validUsers.password, page);

    for (let product of products['addCartItems']) {

      await ProductPage.addItemToCart(product, page);

    }

    await ProductPage.navigateToCart(page);

    const actualItemsAdded = await CartPage.getCartItems(page);

    expect(actualItemsAdded.length).toBeGreaterThan(0);

    areArraysIdentical(products['addCartItems'], actualItemsAdded);

    await CartPage.checkout(page);

  });

  // TC-007: Shipping Information
  test('should show shipping information when checking out', async ({ page }) => {

    await LoginPage.login(validUsers.username, validUsers.password, page);

    for (let product of products['addCartItems']) {

      await ProductPage.addItemToCart(product, page);

    }

    await ProductPage.navigateToCart(page);

    const actualItemsAdded: string[] = await CartPage.getCartItems(page)

    expect(actualItemsAdded.length).toBeGreaterThan(0);

    areArraysIdentical(products['addCartItems'], actualItemsAdded);

    await CartPage.checkout(page);

    await CheckoutPage.fillShippingInformation(validUsers['firstName'], validUsers['lastName'], validUsers['postalCode'], page);

    const shippingInformationDetails = await CheckoutPage.getShippingInformation(page);

    expect(shippingInformationDetails).toBe(products['shippingInformation']);

  });

  // TC-008: Price Calculation including tax with Multiple Items
  test('should provide correct total when checking out with multiple items', async ({ page }) => {

    await LoginPage.login(validUsers.username, validUsers.password, page);

    for (let product of products['addCartItems']) {

      await ProductPage.addItemToCart(product, page);

    }

    await ProductPage.navigateToCart(page);

    await CartPage.checkout(page);

    await CheckoutPage.fillShippingInformation(validUsers['firstName'], validUsers['lastName'], validUsers['postalCode'], page);

    const actualPrice: (string | undefined)[] = await CheckoutPage.getPaymentInfomrmation(page);

    const expectedPrice = Object.values(products['expectedPrice']);

    expect(areArraysIdentical(expectedPrice, actualPrice)).toBe(true);

  });

});

