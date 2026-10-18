const {test, expect, request} = require('@playwright/test');
const {APIUtils} = require('../utils/APIUtils');


const loginPayLoad = {userEmail:"achyuthmanepally@gmail.com",userPassword:"Rahul@123"};
const orderPayLoad = {orders:[{country:"Cuba",productOrderedId:"6960eac0c941646b7a8b3e68"}]};
const fakePayloadOrders = {data: [], message: "No Orders"};
// test.use({ ignoreHTTPSErrors: true });  -> globallyb setting to igonre

let response;
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
await page.goto("https://rahulshettyacademy.com/client");

await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async route =>{
        //intercepting response - API response -> {playwright fake response} -> browser -> render data on front end
        const response = await page.request.fetch(route.request(), {ignoreHTTPSErrors: true}); // turining page mode to API mode to fetch response
        let body = JSON.stringify(fakePayloadOrders);  //sending obj as json so coverting it to json
        route.fulfill(
            {
                response,
                body,       //we are altering body here with same response
            }); //send back data to browser to render it on UI
    });
await page.locator("button[routerlink*='myorders']").click();
//await page.pause();
await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
console.log(await page.locator(".mt-4").textContent());
});

//Verify if order created is showing in history page
// Precondition - create order -