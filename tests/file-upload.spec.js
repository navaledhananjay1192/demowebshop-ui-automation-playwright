import {test, expect } from "@playwright/test"
import path from 'path';

test("Verify the file uplaod functionality", async({page})=>{
    test.setTimeout(60000)
    await page.goto("https://the-internet.herokuapp.com/upload")
    const filePath = path.join(__dirname,'../testData/File-2ue9k.pdf')
	await page.locator("[name='file']").setInputFiles(filePath);
	await page.locator("[value='Upload']").click();
    await expect (page.locator("//a[text()='Elemental Selenium']")).toBeVisible()
	await expect(page.locator("//h3[text()='File Uploaded!']")).toHaveText('File Uploaded!')
})