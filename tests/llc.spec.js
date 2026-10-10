import { test, expect } from '@playwright/test';
import { text } from 'node:stream/consumers';

test('Playwright Special locators', async({page}) => {

    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click(); // when input tag is label this works for radio/checkbox
    await page.getByLabel("Employed").check();  //click() or check works here for radio or checkbox
    await page.getByLabel("Gender").selectOption("Female"); //select tag
    await page.getByPlaceholder("Password").fill("Ramachandra");
    await page.getByRole("button",{name: 'Submit'}).click(); 
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible(); //gives boolean value, just checking if visible or not, it won't fail if not visible
    //expect assertions has default 5s timeout, we are overriding at step level here
    await expect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible({timeout: 10_000}); //it fails if not text is visible, we can override default timeout by passing timeout parameter 
    await page.getByRole("link",{name: 'Shop'}).click();
    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();
});     

test('Playwright Test level assertion', async({page}) => {

    test.timeout(6000);
    const slowExpect = expect.configure({timeout: 9000});
    page.setDefaultTimeout(9000); //Test level timeout for actions
    
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click(); // when input tag is label this works for radio/checkbox
    await page.getByLabel("Employed").check();  //click() or check works here for radio or checkbox
    await page.getByLabel("Gender").selectOption("Female"); //select tag
    await page.getByPlaceholder("Password").fill("Ramachandra");
    await page.getByRole("button",{name: 'Submit'}).click(); 
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();  
    
    //expect assertions has default 5s timeout, we are overriding at step level here
    await slowExpect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible();
    
    await page.getByRole("link",{name: 'Shop'}).click();
    await slowExpect(page.locator(".my-4")).toHaveText("Shop");
    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();
}); 