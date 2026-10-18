const { expect } = require("@playwright/test");
const {customtest} = require("../utils/fixtures");

customtest('Fixtures demo', async({authenticatedPage, createOrder, testDataForOrder}) =>
{
    //login to app, create order and verify if order is created
    //Fixture - reusable code for setup and teardown for pl test and we can inject into tst
    authenticatedPage.goto("https://rahulshettyacademy.com/client");
    await authenticatedPage.locator("button[routerlink*='myorders']").click();
    await authenticatedPage.locator("tbody").waitFor();
    await expect(authenticatedPage.getByText(createOrder.orderId)).toBeVisible();
    console.log(testDataForOrder.productName);
})