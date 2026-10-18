# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ClientAppOtherWay.spec.js >> @Webst Client App login
- Location: tests/ClientAppOtherWay.spec.js:4:5

# Error details

```
Error: page.waitForLoadState: Test ended.
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { text } from 'node:stream/consumers';
  3  | //Interview question Select 1 product, add to cart, checkout, get order ID and cross check order Id is found in order history list and deatils
  4  | test('@Webst Client App login', async ({ page }) => {
  5  |    //js file- Login js, DashboardPage
  6  |    const email = "anshikaw@yahoo.com";
  7  |    const productName = 'ZARA COAT 3';
  8  |    const products = page.locator(".card-body");
  9  |    await page.goto("https://rahulshettyacademy.com/client");
  10 |    await page.getByPlaceholder("email@example.com").fill(email);
  11 |    await page.getByPlaceholder("enter your passsword").fill("Learning@830$3mK3");
  12 |    await page.getByRole("button",{name:'login'}).click();
> 13 |    await page.waitForLoadState('networkidle');
     |               ^ Error: page.waitForLoadState: Test ended.
  14 |    await page.locator(".card-body b").first().waitFor();
  15 | 
  16 |    await page.locator(".card-body").filter({hasText:"ZARA COAT 3"}).getByRole("button",{name:"Add to Cart"}).click();
  17 | 
  18 |    await page.getByRole("listitem").getByRole("button",{name:"Cart"}).click();
  19 | 
  20 |    //await page.pause();
  21 | 
  22 |    await page.locator("div li").first().waitFor();
  23 |    await expect(page.getByText("ZARA COAT 3")).toBeVisible();
  24 |    await page.getByRole("button",{name:"Checkout"}).click();
  25 |    await page.getByPlaceholder("Select Country").pressSequentially("ind");
  26 |    await page.getByRole("button",{name:"India"}).nth(1).click();
  27 |    expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
  28 |    await page.getByText("PLACE ORDER").click();
  29 |    await expect(page.getByText("Thankyou for the order.")).toBeVisible();
  30 | 
  31 | 
  32 | });
```