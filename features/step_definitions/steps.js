const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { expect} = require('@playwright/test');
const {playwright} = require('@playwright/test')
const { POManager } = require('../../pageobjects/POManager');
const { chromium } = require('playwright');

setDefaultTimeout(60 * 1000);
Given('A login to Ecommerce application with {string} and {string}', async function (username, password) 
{
    // Write code here that turns the phrase above into concrete actions
    const products = this.page.locator(".card-body");
    const loginPage = this.poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(username, password);
});

When('Add {string} to Cart', async function (productName) {
    // Write code here that turns the phrase above into concrete actions
    this.dashboardPage = this.poManager.getDashboardPage({setTimeout: 60*1000});
    await this.dashboardPage.searchProductAddCart(productName);
    await this.dashboardPage.navigateToCart();
});
Then('Verify {string} is displayed in the Cart', async function (productName) {
    // Write code here that turns the phrase above into concrete actions
    const cartPage = this.poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(productName);
    await cartPage.Checkout();
});
When('Enter valid deatils and Place Order', async function () {
    // Write code here that turns the phrase above into concrete actions
    const ordersReviewPage = this.poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind", "India");
     this.orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(this.orderId);
});

Then('Verify order is present in the OrderHistory page', async function () {
    // Write code here that turns the phrase above into concrete actions
    await this.dashboardPage.navigateToOrders();
    const ordersHistoryPage = this.poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(this.orderId);
    expect(this.orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
});


 Given('A login to Ecommerce2 application with {string} and {string}', async function (username, password) {
    const userName = this.page.locator('#username');
    //const password = this.page.locator("[type='password']");
    const cardTitles = this.page.locator(".card-body a");
    // Write code here that turns the phrase above into concrete actions
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await userName.fill(username); //type for edit box is deprictaed, now we use fill method
    //await password.fill(password);
    await this.page.locator("#signInBtn").click();
    });

Then('Verify error message is diaplyed',async function () {
           // Write code here that turns the phrase above into concrete actions
           console.log(await this.page.locator("[style*='block']").textContent());
           await expect(this.page.locator("[style*='block']")).toContainText('Incorrect username/password.');

         });