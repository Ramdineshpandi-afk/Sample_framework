import { test, expect } from '@playwright/test';

test.describe('verify the login and cart interaction along with checkout process', async ()=>{
test('verify the login page', async ({ page }) => {
  await page.goto('v1/index.html');
  expect(await page.title()).toBe("Swag Labs");
});
test('verify the authenticated user can login successfully', async ({ page }) => {

});
});
