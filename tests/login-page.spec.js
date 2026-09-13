const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const testData = require('../testData/testData.json');

test.use({
    storageState: { cookies: [], origins: [] },
    screenshot: 'on'
});

test.describe('Login page', () => {
    let loginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.gotoLoginPage();
    });

    test('TC_LOGIN_001: displays the login form', async ({ page }) => {
        await expect(page).toHaveTitle('Demo Web Shop. Login');
        await expect(page.getByRole('heading', { name: 'Welcome, Please Sign In!' })).toBeVisible();
        await expect(loginPage.userName).toBeVisible();
        await expect(loginPage.passWord).toBeVisible();
        await expect(loginPage.loginButton).toBeVisible();
        await expect(loginPage.rememberMe).not.toBeChecked();
    });

    test('TC_LOGIN_002: navigates to password recovery', async ({ page }) => {
        await loginPage.forgotPasswordLink.click();
        await expect(page).toHaveURL(/passwordrecovery/);
    });

    test('TC_LOGIN_003: navigates to registration from the login page', async ({ page }) => {
        await loginPage.registerButton.click();
        await expect(page).toHaveURL(/register/);
    });

    test('TC_LOGIN_004: rejects empty credentials', async () => {
        await loginPage.clickLoginButton();
        await expect(loginPage.loginError).toHaveText(testData.login.errors.loginUnsuccessful);
        await expect(loginPage.accountNotFoundError).toHaveText(testData.login.errors.accountNotFound);
    });

    test('TC_LOGIN_005: rejects an unknown email address', async () => {
        await loginPage.enterUsername(testData.login.unknownEmail);
        await loginPage.enterPassword(testData.login.invalidPassword);
        await loginPage.clickLoginButton();
        await expect(loginPage.loginError).toHaveText(testData.login.errors.loginUnsuccessful);
        await expect(loginPage.accountNotFoundError).toHaveText(testData.login.errors.accountNotFound);
    });

    test('TC_LOGIN_006: rejects an incorrect password for a known email', async () => {
        test.skip(!process.env.USERNAME, 'Requires the configured test account email');
        await loginPage.enterUsername(process.env.USERNAME);
        await loginPage.enterPassword(testData.login.invalidPassword);
        await loginPage.clickLoginButton();
        await expect(loginPage.loginError).toHaveText(testData.login.errors.loginUnsuccessful);
        await expect(loginPage.logoutLink).toHaveCount(0);
    });

    test('TC_LOGIN_007: masks the password input', async () => {
        await expect(loginPage.passWord).toHaveAttribute('type', 'password');
    });

    test('TC_LOGIN_008: allows the remember-me option to be selected', async () => {
        await loginPage.rememberMe.check();
        await expect(loginPage.rememberMe).toBeChecked();
    });

    test('TC_LOGIN_009: logs in with valid credentials', async () => {
        test.skip(!process.env.USERNAME || !process.env.PASSWORD, 'Requires USERNAME and PASSWORD');
        await loginPage.login();
        await expect(loginPage.logoutLink).toBeVisible();
    });
});