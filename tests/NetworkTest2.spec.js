const { test, expect } = require('@playwright/test');

test('Security test request intercept', async ({ page }) => {

    //login code

    const email = "achyuthmanepally@gmail.com";
    const productName = 'ZARA COAT 3';
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Rahul@123");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    await page.locator("button[routerlink*='myorders']").click();


    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({ url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6960eac0c941646b7a8b3e68" })
        //continue method will intercept request calls
        //route.continue({headers}, url: " ", cookie) we can intercept both/any if we want headers and url
    )
    await page.locator("button:has-text('View')").first().click();   //button with text locator, has-text reg exp
    //await page.pause();
    expect(await page.locator("p").last()).toHaveText("You are not authorize to view this order");

})