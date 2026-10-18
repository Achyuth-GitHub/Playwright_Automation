import { test, expect } from '@playwright/test';
import { timeout } from '../playwright.config';

test('Full Booking Flow with Event Creation', async({page}) =>{
    //later this will be moved into login page.ts
    async function loginToEventHub(page, email = "achyuthmanepally@gmail.com", password = "Rahul@123") {
    await page.goto("https://eventhub.rahulshettyacademy.com");
    await page.getByPlaceholder("you@email.com").fill(email);
    await page.getByPlaceholder("••••••").fill(password);
    await page.getByRole("Button",{name:"Sign In"}).click();
    await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible(); 
    }
    //login
    await loginToEventHub(page);

    //navigation to Manage events
    await page.getByRole("button",{name:"Admin"}).click();
    await page.getByRole('navigation').getByRole('link', { name: 'Manage Events' }).click();

    //Creating new event
    const title = await page.getByPlaceholder("Event title").fill("Test Event1 ${Date.now()");
    await page.getByRole('textbox', { name: 'Describe the event…' }).fill('Test Desc');
    await page.getByLabel('Category*').selectOption('Concert');
    await page.getByRole('textbox', { name: 'City*' }).fill('Hyderabad');
    await page.getByRole('textbox', { name: 'Venue*' }).fill('Test Venue');
    await page.getByRole('spinbutton', { name: 'Price ($)*' }).fill('100');
    await page.getByRole('textbox', { name: 'Event Date & Time*' }).fill('2026-10-12T20:33');
    await page.getByRole('spinbutton', { name: 'Total Seats*' }).fill('2');
    await page.getByRole('textbox', { name: 'Image URL (optional)' }).click();
    await page.getByTestId('add-event-btn').click();
    //Verifying Event creation text
    await expect(page.getByText('Event created!')).toBeVisible();
    //page.pause();
    //Find the event card and capture seats
    //Navigate to /events

    const events = await page.locator("#nav-events").click();
   

    // Get all event cards (locate by data-testid="event-card")
    const cards = await page.locator("#event-card");
    

// Assert the first card is visible (confirms page loaded)
await cards.first().waitFor();
//From all cards, filter for the one that contains your event title text
await cards.filter({hasText:title}).getByText("Test Event1 ${Date.now()").click();
// Assert the matched card is visible (timeout 5 seconds)
const title2 = await page.getByRole('heading', { name: 'Test Event1 ${Date.now()'}).textContent();
if(title2 == title)
{
    console.log("Card matched");
}
// Read the seat count text from that card (locate element containing text seat, parse integer from its inner text) — store this as seatsBeforeBooking
const seatsAvailable = await page.locator(".text-amber-600.font-semibold").textContent();
console.log(seatsAvailable);
})