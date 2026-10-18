const {test, expect, request} = require('@playwright/test');
const {APIUtils} = require('../utils/APIUtils');


const loginPayLoad = {userEmail:"achyuthmanepally@gmail.com",userPassword:"Rahul@123"};
const orderPayLoad = {orders:[{country:"Cuba",productOrderedId:"6960eac0c941646b7a8b3e68"}]};
let fakePayLoads = {data: [], message: "No Orders"};

let response;
test.use({ignoreHTTPSErrors:true});
test.beforeAll( async()=>
{
   const apiContext = await request.newContext({ignoreHTTPSErrors: true});
   const apiUtils = new APIUtils(apiContext,loginPayLoad);
   response =  await apiUtils.createOrder(orderPayLoad);

})


//create order is success
test('@API Place the order', async ({page})=>
{ 
    await page.addInitScript(value => {

        window.localStorage.setItem('token',value);
    }, response.token );

await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async route => {
        const response = await page.request.fetch(route.request());
        let body = JSON.stringify(fakePayLoads);
        route.fulfill({
            response,
            body,
        })
    }
)
await page.goto("https://rahulshettyacademy.com/client");
//await page.pause();
await page.locator("button[routerlink*='myorders']").click();
await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")
console.log(await page.locator(".mt-4").textContent());
});

//Verify if order created is showing in history page
// Precondition - create order -