import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import testData from "../utility/testData.json"


test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
})

test("TCID01: @smoke @regression : Verify user is able to login with valid creditionals", async ({ page }) => {
    await expect(page.getByRole(' link', { name: 'Log out' })).toHaveText("Log out")
})

test("TC02 verify add to cart button", async ({ page }) => {
    await page.locator("(//input[@value='Add to cart'])[1]").click()
    await expect(page.locator("[itemprop='name']")).toHaveText(testData.productOne)

})

test("TC02 verify add to cart button", async ({ page }) => {
    await page.locator("(//input[@value='Add to cart'])[1]").click()
    await expect(page.locator("[itemprop='name']")).toHaveText(testData.productOne)

})