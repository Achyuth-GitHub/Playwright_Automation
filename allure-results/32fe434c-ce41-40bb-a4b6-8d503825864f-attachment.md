# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ClientAppPO.spec.js >> @web Client App login for Adidas Originals
- Location: tests/ClientAppPO.spec.js:14:5

# Error details

```
TimeoutError: locator.waitFor: Timeout 10000ms exceeded.
Call log:
  - waiting for locator('div li').first() to be visible

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - navigation [ref=e5]:
    - generic [ref=e7]:
      - link "Automation Automation Practice":
        - /url: ""
        - generic [ref=e8] [cursor=pointer]:
          - heading "Automation" [level=3] [ref=e9]
          - paragraph [ref=e10]: Automation Practice
    - text: 
    - link "🎯 I'll help you prepare for your next QA job — Explore the QA Career Accelerator." [ref=e11] [cursor=pointer]:
      - /url: https://rahulshettyacademy.com/qa-career-accelerator-job-ready
    - list [ref=e12]:
      - listitem [ref=e13] [cursor=pointer]:
        - button " HOME" [ref=e14]:
          - generic [ref=e15]: 
          - text: HOME
      - listitem
      - listitem [ref=e16] [cursor=pointer]:
        - button " ORDERS" [ref=e17]:
          - generic [ref=e18]: 
          - text: ORDERS
      - listitem [ref=e19] [cursor=pointer]:
        - button " Cart" [ref=e20]:
          - generic [ref=e21]: 
          - text: Cart
      - listitem [ref=e22] [cursor=pointer]:
        - button "Sign Out" [ref=e23]:
          - generic [aria-hidden] [ref=e24]: 
          - text: Sign Out
  - generic [ref=e25]:
    - generic [ref=e26]:
      - heading "My Cart" [level=1] [ref=e27]
      - button "Continue Shopping❯" [ref=e28] [cursor=pointer]
    - heading "No Products in Your Cart !" [level=1] [ref=e30]
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | const {customtest} = require('../utils/test-base.js');
  3   | import { text } from 'node:stream/consumers';
  4   | import { LoginPage } from '../pageobjects/loginPage';
  5   | import { DashboadPage } from '../pageobjects/DashboardPage';
  6   | 
  7   | //Json-> String -> JS obj to access data easily
  8   | const dataset = JSON.parse(JSON.stringify(require("../utils/placeorderTestData.json")));
  9   | 
  10  | 
  11  | for(const data of dataset)
  12  | {
  13  | //Interview question Select 1 product, add to cart, checkout, get order ID and cross check order Id is found in order history list and deatils
  14  | test(`@web Client App login for ${data.productName}`, async ({ page }) => 
  15  |    {
  16  |    //js file- Login js, DashboardPage
  17  |    const products = page.locator(".card-body");
  18  | 
  19  |    const loginPage = new LoginPage(page);
  20  |    await loginPage.goTo();
  21  |    await loginPage.validLogin(data.username, data.password);
  22  | 
  23  |    const dashboardPage = new DashboadPage(page);
  24  |    await dashboardPage.searchProductAddCart(data.productName);
  25  |    await dashboardPage.navigateToCart();
  26  |    
  27  |    
  28  | 
> 29  |    await page.locator("div li").first().waitFor();
      |                                         ^ TimeoutError: locator.waitFor: Timeout 10000ms exceeded.
  30  |    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
  31  |    expect(bool).toBeTruthy();
  32  |    await page.locator("text=Checkout").click();
  33  | 
  34  |    await page.locator("[placeholder*='Country']").pressSequentially("ind");
  35  |    const dropdown = page.locator(".ta-results");
  36  |    await dropdown.waitFor();
  37  |    const optionsCount = await dropdown.locator("button").count();
  38  |    for (let i = 0; i < optionsCount; ++i) {
  39  |       const text = await dropdown.locator("button").nth(i).textContent();
  40  |       if (text === " India") {
  41  |          await dropdown.locator("button").nth(i).click();
  42  |          break;
  43  |       }
  44  |    }
  45  | 
  46  |    expect(page.locator(".user__name [type='text']").first()).toHaveText(data.username);
  47  |    await page.locator(".action__submit").click();
  48  |    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
  49  |    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
  50  |    console.log(orderId);
  51  | 
  52  |    await page.locator("button[routerlink*='myorders']").click();
  53  |    await page.locator("tbody").waitFor();
  54  |    const rows = await page.locator("tbody tr");
  55  | 
  56  | 
  57  |    for (let i = 0; i < await rows.count(); ++i) {
  58  |       const rowOrderId = await rows.nth(i).locator("th").textContent();
  59  |       if (orderId.includes(rowOrderId)) {
  60  |          await rows.nth(i).locator("button").first().click();
  61  |          break;
  62  |       }
  63  |    }
  64  |    const orderIdDetails = await page.locator(".col-text").textContent();
  65  |    expect(orderId.includes(orderIdDetails)).toBeTruthy();
  66  | 
  67  | });
  68  | }
  69  | 
  70  | customtest('Client App login for' , async ({ page, testDataForOrder }) => 
  71  |    {
  72  |    //js file- Login js, DashboardPage
  73  |    const products = page.locator(".card-body");
  74  | 
  75  |    const loginPage = new LoginPage(page);
  76  |    await loginPage.goTo();
  77  |    await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password);
  78  | 
  79  |    const dashboardPage = new DashboadPage(page);
  80  |    await dashboardPage.searchProductAddCart(testDataForOrder.productName);
  81  |    await dashboardPage.navigateToCart();
  82  |    
  83  |    
  84  | 
  85  |    await page.locator("div li").first().waitFor();
  86  |    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
  87  |    expect(bool).toBeTruthy();
  88  |    await page.locator("text=Checkout").click();
  89  | 
  90  |    await page.locator("[placeholder*='Country']").pressSequentially("ind");
  91  |    const dropdown = page.locator(".ta-results");
  92  |    await dropdown.waitFor();
  93  |    const optionsCount = await dropdown.locator("button").count();
  94  |    for (let i = 0; i < optionsCount; ++i) {
  95  |       const text = await dropdown.locator("button").nth(i).textContent();
  96  |       if (text === " India") {
  97  |          await dropdown.locator("button").nth(i).click();
  98  |          break;
  99  |       }
  100 |    }
  101 | 
  102 |    expect(page.locator(".user__name [type='text']").first()).toHaveText(testDataForOrder.username);
  103 |    await page.locator(".action__submit").click();
  104 |    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
  105 |    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
  106 |    console.log(orderId);
  107 |    }
  108 | );
  109 | 
```