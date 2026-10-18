const {test, expect} = require("@playwright/test");

//test.describe.configure({mode:'parallel'});
test.describe.configure({mode:'serial'});


test("Popup Validations", async({page}) =>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("https://google.com");
    // await page.goBack(); //back button on browser
    // await page.goForward(); //forward button on browser
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();

    const framesPage = page.frameLocator("#courses-iframe");
    await framesPage.locator("li a[href*='lifetime-access']:visible").click();
    const textCheck = await framesPage.locator(".text h2").textContent();
    console.log(textCheck.split(" ")[1]);
})

test(" @Web Screenshot & Visual Comparision", async({page}) =>
{   
     await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#displayed-text").screenshot({path:'partialScreenshot.png'});
    await page.locator("#hide-textbox").click();
    await page.screenshot({path: 'screenshot.png'});
    await expect(page.locator("#displayed-text")).toBeHidden();
})

test('Visual Testing',async({page}) => {
    await page.goto("https://www.Google.com");
    expect(await page.screenshot()).toMatchSnapshot('landing.png');
})