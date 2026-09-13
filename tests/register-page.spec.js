const { test, expect } = require('@playwright/test');
const { randomUUID } = require('node:crypto');
const { RegisterPage } = require('../pages/RegisterPage');
const testData = require('../testData/testData.json');

test.use({
    storageState: { cookies: [], origins: [] },
    screenshot: 'on'
});

const registrationData = testData.registration;

function uniqueEmail() {
    return `pw.register.${randomUUID()}@example.com`;
}

test.describe('Register page', () => {
    let registerPage;

    test.beforeEach(async ({ page }) => {
        registerPage = new RegisterPage(page);
        await registerPage.gotoRegisterPage();
    });

    test('TC_REGISTER_001: displays the registration form', async ({ page }) => {
        await expect(page).toHaveTitle('Demo Web Shop. Register');
        await expect(page.getByRole('heading', { name: 'Register' })).toBeVisible();
        await expect(registerPage.genderMale).toBeVisible();
        await expect(registerPage.genderFemale).toBeVisible();
        await expect(registerPage.firstName).toBeVisible();
        await expect(registerPage.lastName).toBeVisible();
        await expect(registerPage.email).toBeVisible();
        await expect(registerPage.password).toBeVisible();
        await expect(registerPage.confirmPassword).toBeVisible();
        await expect(registerPage.registerButton).toBeVisible();
    });

    test('TC_REGISTER_002: allows the male gender option to be selected', async () => {
        await registerPage.selectGender('Male');
        await expect(registerPage.genderMale).toBeChecked();
        await expect(registerPage.genderFemale).not.toBeChecked();
    });

    test('TC_REGISTER_003: allows the female gender option to be selected', async () => {
        await registerPage.selectGender('Female');
        await expect(registerPage.genderFemale).toBeChecked();
        await expect(registerPage.genderMale).not.toBeChecked();
    });

    test('TC_REGISTER_004: validates all required fields', async () => {
        await registerPage.submitRegistration();
        await expect(registerPage.firstNameError).toHaveText(registrationData.errors.firstNameRequired);
        await expect(registerPage.lastNameError).toHaveText(registrationData.errors.lastNameRequired);
        await expect(registerPage.emailError).toHaveText(registrationData.errors.emailRequired);
        await expect(registerPage.passwordError).toHaveText(registrationData.errors.passwordRequired);
        await expect(registerPage.confirmPasswordError).toHaveText(registrationData.errors.passwordRequired);
    });

    test('TC_REGISTER_005: rejects an invalid email format', async () => {
        await registerPage.fillRegistrationForm({
            firstName: registrationData.firstName,
            lastName: registrationData.lastName,
            email: registrationData.invalidEmail,
            password: registrationData.password,
            confirmPassword: registrationData.password
        });
        await registerPage.submitRegistration();
        await expect(registerPage.emailError).toHaveText(registrationData.errors.invalidEmail);
    });

    test('TC_REGISTER_006: rejects a password shorter than six characters', async () => {
        await registerPage.fillRegistrationForm({
            firstName: registrationData.firstName,
            lastName: registrationData.lastName,
            email: uniqueEmail(),
            password: registrationData.shortPassword,
            confirmPassword: registrationData.shortPassword
        });
        await registerPage.submitRegistration();
        await expect(registerPage.passwordError).toHaveText(registrationData.errors.shortPassword);
    });

    test('TC_REGISTER_007: rejects mismatched password confirmation', async () => {
        await registerPage.fillRegistrationForm({
            firstName: registrationData.firstName,
            lastName: registrationData.lastName,
            email: uniqueEmail(),
            password: registrationData.password,
            confirmPassword: registrationData.mismatchedPassword
        });
        await registerPage.submitRegistration();
        await expect(registerPage.confirmPasswordError).toHaveText(registrationData.errors.passwordMismatch);
    });

    test('TC_REGISTER_008: masks both password fields', async () => {
        await expect(registerPage.password).toHaveAttribute('type', 'password');
        await expect(registerPage.confirmPassword).toHaveAttribute('type', 'password');
    });

    test('TC_REGISTER_009: provides a link to the login page', async ({ page }) => {
        await registerPage.loginLink.click();
        await expect(page).toHaveURL(/login/);
    });

    test('TC_REGISTER_010: registers a new customer successfully', async () => {
        await registerPage.fillRegistrationForm({
            gender: 'Female',
            firstName: registrationData.firstName,
            lastName: registrationData.lastName,
            email: uniqueEmail(),
            password: registrationData.password,
            confirmPassword: registrationData.password
        });
        await registerPage.submitRegistration();
        await expect(registerPage.registrationSuccess).toHaveText(registrationData.successMessage);
        await expect(registerPage.logoutLink).toBeVisible();
    });

    test('TC_REGISTER_011: continue button returns to the home page after registration', async () => {
        await registerPage.fillRegistrationForm({
            firstName: registrationData.firstName,
            lastName: registrationData.lastName,
            email: uniqueEmail(),
            password: registrationData.password,
            confirmPassword: registrationData.password
        });
        await registerPage.submitRegistration();
        await expect(registerPage.registrationSuccess).toHaveText(registrationData.successMessage);
        await registerPage.continueButton.click();
        await expect(registerPage.page).toHaveURL(/\/$/);
    });
});