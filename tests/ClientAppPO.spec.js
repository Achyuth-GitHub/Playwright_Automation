import { test, expect } from '@playwright/test';
const {customtest} = require('../utils/test-base.js');
import { text } from 'node:stream/consumers';
import { LoginPage } from '../pageobjects/loginPage';
import { DashboadPage } from '../pageobjects/DashboardPage';

//Json-> String -> JS obj to access data easily
const dataset = JSON.parse(JSON.stringify(require("../utils/placeorderTestData.json")));


for(const data of dataset)
{
//Interview question Select 1 product, add to cart, checkout, get order ID and cross check order Id is found in order history list and deatils
test(`@web Client App login for ${data.productName}`, async ({ page }) => 
   {
   //js file- Login js, DashboardPage
   const products = page.locator(".card-body");

   const loginPage = new LoginPage(page);
   await loginPage.goTo();
   await loginPage.validLogin(data.username, data.password);

   const dashboardPage = new DashboadPage(page);
   await dashboardPage.searchProductAddCart(data.productName);
   await dashboardPage.navigateToCart();
   
   

   await page.locator("div li").first().waitFor();
   const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
   expect(bool).toBeTruthy();
   await page.locator("text=Checkout").click();

   await page.locator("[placeholder*='Country']").pressSequentially("ind");
   const dropdown = page.locator(".ta-results");
   await dropdown.waitFor();
   const optionsCount = await dropdown.locator("button").count();
   for (let i = 0; i < optionsCount; ++i) {
      const text = await dropdown.locator("button").nth(i).textContent();
      if (text === " India") {
         await dropdown.locator("button").nth(i).click();
         break;
      }
   }

   expect(page.locator(".user__name [type='text']").first()).toHaveText(data.username);
   await page.locator(".action__submit").click();
   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
   const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   console.log(orderId);

   await page.locator("button[routerlink*='myorders']").click();
   await page.locator("tbody").waitFor();
   const rows = await page.locator("tbody tr");


   for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
   const orderIdDetails = await page.locator(".col-text").textContent();
   expect(orderId.includes(orderIdDetails)).toBeTruthy();

});
}

customtest('Client App login for' , async ({ page, testDataForOrder }) => 
   {
   //js file- Login js, DashboardPage
   const products = page.locator(".card-body");

   const loginPage = new LoginPage(page);
   await loginPage.goTo();
   await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password);

   const dashboardPage = new DashboadPage(page);
   await dashboardPage.searchProductAddCart(testDataForOrder.productName);
   await dashboardPage.navigateToCart();
   
   

   await page.locator("div li").first().waitFor();
   const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
   expect(bool).toBeTruthy();
   await page.locator("text=Checkout").click();

   await page.locator("[placeholder*='Country']").pressSequentially("ind");
   const dropdown = page.locator(".ta-results");
   await dropdown.waitFor();
   const optionsCount = await dropdown.locator("button").count();
   for (let i = 0; i < optionsCount; ++i) {
      const text = await dropdown.locator("button").nth(i).textContent();
      if (text === " India") {
         await dropdown.locator("button").nth(i).click();
         break;
      }
   }

   expect(page.locator(".user__name [type='text']").first()).toHaveText(testDataForOrder.username);
   await page.locator(".action__submit").click();
   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
   const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   console.log(orderId);
   }
);
