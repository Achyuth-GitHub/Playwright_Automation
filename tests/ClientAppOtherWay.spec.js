import { test, expect } from '@playwright/test';
import { text } from 'node:stream/consumers';
//Interview question Select 1 product, add to cart, checkout, get order ID and cross check order Id is found in order history list and deatils
test('@Webst Client App login', async ({ page }) => {
   //js file- Login js, DashboardPage
   const email = "anshikaw@yahoo.com";
   const productName = 'ZARA COAT 3';
   const products = page.locator(".card-body");
   await page.goto("https://rahulshettyacademy.com/client");
   await page.getByPlaceholder("email@example.com").fill(email);
   await page.getByPlaceholder("enter your passsword").fill("Learning@830$3mK3");
   await page.getByRole("button",{name:'login'}).click();
   await page.waitForLoadState('networkidle');
   await page.locator(".card-body b").first().waitFor();

   await page.locator(".card-body").filter({hasText:"ZARA COAT 3"}).getByRole("button",{name:"Add to Cart"}).click();

   await page.getByRole("listitem").getByRole("button",{name:"Cart"}).click();

   //await page.pause();

   await page.locator("div li").first().waitFor();
   await expect(page.getByText("ZARA COAT 3")).toBeVisible();
   await page.getByRole("button",{name:"Checkout"}).click();
   await page.getByPlaceholder("Select Country").pressSequentially("ind");
   await page.getByRole("button",{name:"India"}).nth(1).click();
   expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
   await page.getByText("PLACE ORDER").click();
   await expect(page.getByText("Thankyou for the order.")).toBeVisible();


});