const base = require('@playwright/test');

exports.customtest = base.test.extend({
    testDataForOrder: async ({}, use) => {
        await use({
            username: "achyuthmanepally@gmail.com",
            password: "Rahul@123",
            productName: "ZARA COAT 3" 
        });
    }
});