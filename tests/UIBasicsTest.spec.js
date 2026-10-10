import { test, expect } from '@playwright/test';

test('Browser config Playwright', async ({browser})=>
{
  
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    const userName = page.locator('#username');
    const password = page.locator("[type='password']");
    const cardTitles = page.locator(".card-body a");
    //css - we only use CSS insterad of Xpath here for time compelexity
    await userName.fill("rahulshetty"); //type for edit box is deprictaed, now we use fill method
    await password.fill("learning");
    await page.locator("#signInBtn").click();
    console.log(await page.locator("[style*='block']").textContent()); //will extract any text presnt on the locator
    await expect(page.locator("[style*='block']")).toContainText('Incorrect username/password.');
    //type will just type
    //fill will replace text if alrwady exists
    await userName.fill(""); //wipes out existing text
    await userName.fill("rahulshettyacademy")
    await password.fill("");
    await password.fill("Learning@830$3mK2");
    await page.locator("#signInBtn").click();
    //console.log(await cardTitles.first().textContent());
    //console.log(await cardTitles.nth(1).textContent());
    //await page.waitForLoadState('networkidle'); // this will wait untill all network calls are idle, that is all data is loaded
   //above step is flaky, so we are using below alternate step
    await cardTitles.first().waitFor();
    const allTitles = await cardTitles.allTextContents(); //this method wont wait untill all elements load
    console.log(allTitles);

});

test('Page playwright test', async({page})=>
{
    await page.goto("https://www.google.com");
    //get title and assert
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");
});

test('UI Controls', async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator('#username');
    const password = page.locator("[type='password']");
    const dropdown = page.locator("select.form-control");
    const documentLink = page.locator("[href*='documents-request']");
    await dropdown.selectOption("consult");
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    console.log(await page.locator(".radiotextsty").last().isChecked());
    await page.locator("Terms").click();
    //await page.pause();  //to see execution we can pasue it
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy(); // await will be inside here, bcoz action is happening inside
    await expect(documentLink).toHaveAttribute("class","blinkingText");
});

test("Child Windows handling", async ({browser}) =>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("a.blinkingText[href*=\"documents-request\"]");
    const userName = page.locator('#username');
    //const page2 = context.waitForEvent('page');  //this listenere will invoke when another page is opened by clicking a link
    //documentLink.click(); // new page is opened

    //In order to execute sequence of steps that is required for next step we use Promise.all()
    const [newPage] = await Promise.all(
    [
        context.waitForEvent('page'), //listen for any new page penidng, rejected and fulfilled
        documentLink.click(),
    ]) // new page is opened
    const text = await newPage.locator(".red").textContent();
    await console.log(text);
    const arrayText = text.split("@");
    const domain = arrayText[1].split(" ")[0];
    console.log(domain);
    page.locator('#username').fill(domain);
    //await page.pause();
    //await console.log(userText);
    console.log(await page.locator("#username").inputValue());
})


