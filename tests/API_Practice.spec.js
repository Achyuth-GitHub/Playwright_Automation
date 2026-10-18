const {test, expect, request} = require("@playwright/test");

const loginURL = "https://rahulshettyacademy.com/api/ecom/auth/login";
const payLoad = {userEmail:"achyuthmanepally@gmail.com",userPassword:"Rahul@123"};
let token;
let orderID;

const orderURL = "https://rahulshettyacademy.com/api/ecom/order/create-order";
const orderPayLoad = {orders:[{country:"India",productOrderedId:"6960eac0c941646b7a8b3e68"}]}

test.beforeAll( async() => 
{
    const apiContext = await request.newContext({ignoreHTTPSErrors:true});
    const responseBody = await apiContext.post(loginURL, {data: payLoad});
    console.log(await responseBody.status());
    const jsonBody = await responseBody.json();
    token = await jsonBody.token;
    console.log(token);

    const orderResposneBody = await apiContext.post(orderURL, {data: orderPayLoad,
        headers: {
            'authorization' : token,
            'content-type' : 'application/json'
        }
    });
    const orderResposneJsonBody = await orderResposneBody.json();
    orderID = orderResposneJsonBody.orders[0];
    console.log(orderID);
})

test.beforeEach(async({page}) =>
{
    await page.addInitScript(value => {window.localStorage.setItem('token', value)}, token);
    await page.goto("https://rahulshettyacademy.com/client");
})

test('API Practice', async({page}) => {
   
    await page.locator("button[routerlink*='myorders']").click();

});

test('API Practice2', async({page}) => {

    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");

for(let i =0; i<await rows.count(); ++i)
{
   const rowOrderId =await rows.nth(i).locator("th").textContent();
   if (orderID.includes(rowOrderId))
   {
       await rows.nth(i).locator("button").first().click();
       break;
   }
}
const orderIdDetails =await page.locator(".col-text").textContent();
//page.pause();
expect(orderID.includes(orderIdDetails)).toBeTruthy();
});
