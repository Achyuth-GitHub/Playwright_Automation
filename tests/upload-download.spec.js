const {test, expect} = require('@playwright/test');
const ExcelJs = require('exceljs');  //importing dependency/libarary

async function writexcelTest(searchText, replaceText,change,filePath)
{
//we call excel as workbooks
const workbook = new ExcelJs.Workbook();

//file path
await workbook.xlsx.readFile(filePath)

//telling which worksheet we are going to work on
const worksheet = workbook.getWorksheet('Sheet1');

const output = await readExcel(worksheet,searchText, change);



//now replace apple with iphone
const cell = worksheet.getCell(output.row, output.column+change.colChange);
cell.value = replaceText;
await workbook.xlsx.writeFile(filePath);

}


async function readExcel(worksheet, searchText) {

//creating obj for reusing loop values outside of it
let output = {row: -1, column: -1};

    //now lets print all valuses from that sheet
    worksheet.eachRow((row, rowNumber) =>   //first row, row number =1, 2nd row, row number =2, ..
{
    row.eachCell((cell, colNumber) =>   //On row 1 only (first cell, col num =1, 2nd cell, col 2,...)
    {
        //console.log(cell.value);
        if(cell.value === searchText)
        {
            output.row = rowNumber;
            output.column = colNumber;
            console.log(rowNumber +","+ colNumber);
        }
    })
})

return output;
    
}
//Update Mango price to 350
//calling function to run
//writexcelTest("Mango","350",{rowChange:0, colChange:2}, "/Users/1000060377/Documents/exceldownloadTest.xlsx");

test('@Web Upload download excel validation', async({page})=>
{
    const textSearch = 'Mango';
    const updateValue = '350';
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    const downloadPromise = page.waitForEvent('download');  //waiting for download event
    await page.getByRole('button', {name: 'Download'}).click();
    await downloadPromise;  //it will wait untill download is fully complete
    await writexcelTest("Mango","350",{rowChange:0, colChange:2}, "/Users/1000060377/Downloads/download.xlsx");
    await page.locator("#fileinput").click();
    //we can't use playwright to handle winow, so we have inbuild fn ie setInputFiles 
    await page.locator("#fileinput").setInputFiles("/Users/1000060377/Downloads/download.xlsx")
    const textlocator = page.getByText(textSearch);
    const desiredRow = await page.getByRole('row').filter({has: textlocator});
    await expect(desiredRow.locator("#cell-4-undefined")).toContainText(updateValue);
})