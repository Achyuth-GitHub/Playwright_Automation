const { Before, After, BeforeStep, AfterStep, Status } = require("@cucumber/cucumber");
const { POManager } = require('../../pageobjects/POManager');
const { chromium } = require('playwright'); // Use this import

Before(async function() {  //runs for only scearnios who has tag @foo
    // 1. Call chromium.launch() directly
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    this.page = await context.newPage();
    
    // 2. Pass this.page instead of page
    this.poManager = new POManager(this.page); 
});

// closing will be done automatically by playwright

After(function(){
    console.log("I'm last to execute");
});

BeforeStep(function()
{

})

AfterStep(async function({result}){
// if step fails, it capture that failed step
if(result.status === Status.FAILED){
    await this.page.screenshot({path: 'Screenshot1.png'});
}
});

/*
Before({tags: "@foo"},async function() {  //runs for only scearnios who has tag @foo
     Before({tags: "@foo and @bar"},async function() {  //runs for both scearnios who has tag @foo and bar
        Before({tags: "@foo or @bar"},async function() {  //runs for both scearnios who has tag @foo or bar
        */