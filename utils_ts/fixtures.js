const base = require('@playwright/test');
const {APIUtils} = require('./APIUtils');
const {request} = require('@playwright/test');

const loginPayLoad = {userEmail:"achyuthmanepally@gmail.com",userPassword:"Rahul@123"};
const orderPayLoad = {orders:[{country:"Cuba",productOrderedId:"6960eac0c941646b7a8b3e68"}]};

exports.customtest = base.test.extend(
{
    authenticatedPage : async({browser}, use) =>
    {
    //setup
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("achyuthmanepally@gmail.com");
    await page.locator("#userPassword").fill("Rahul@123");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    //till below use stpe it will be executed at test start
    await use(page);
        
    //tear down
    await context.close();
    },

    createOrder: async({}, use) => {

    //setup
    const apiContext = await request.newContext({ignoreHTTPSErrors: true});
    const apiUtils = new APIUtils(apiContext,loginPayLoad);
    const response =  await apiUtils.createOrder(orderPayLoad);

    await use(response);

    //tear down
    await apiContext.dispose();
    },

    //can use as test data also
    testDataForOrder:{   
        productName : 'ADIDAS ORIGINALS'
    }
}
)