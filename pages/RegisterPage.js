export class RegisterPage {
    constructor(page) {
        this.page = page;
        this.genderMale = page.getByRole('radio', { name: 'Male', exact: true });
        this.genderFemale = page.getByRole('radio', { name: 'Female', exact: true });
        this.firstName = page.getByRole('textbox', { name: 'First name:' });
        this.lastName = page.getByRole('textbox', { name: 'Last name:' });
        this.email = page.getByRole('textbox', { name: 'Email:' });
        this.password = page.getByRole('textbox', { name: 'Password:', exact: true });
        this.confirmPassword = page.getByRole('textbox', { name: 'Confirm password:' });
        this.registerButton = page.getByRole('button', { name: 'Register' });
        this.continueButton = page.getByRole('button', { name: 'Continue' });
        this.loginLink = page.getByRole('link', { name: 'Log in' });
        this.registrationSuccess = page.getByText('Your registration completed');
        this.firstNameError = page.locator("[data-valmsg-for='FirstName']");
        this.lastNameError = page.locator("[data-valmsg-for='LastName']");
        this.emailError = page.locator("[data-valmsg-for='Email']");
        this.passwordError = page.locator("[data-valmsg-for='Password']");
        this.confirmPasswordError = page.locator("[data-valmsg-for='ConfirmPassword']");
        this.logoutLink = page.getByRole('link', { name: 'Log out' });
    }

    async gotoRegisterPage() {
        await this.page.goto('/register');
    }

    async selectGender(gender) {
        await (gender === 'Male' ? this.genderMale : this.genderFemale).check();
    }

    async fillRegistrationForm({ gender, firstName, lastName, email, password, confirmPassword }) {
        if (gender) await this.selectGender(gender);
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.email.fill(email);
        await this.password.fill(password);
        await this.confirmPassword.fill(confirmPassword);
    }

    async submitRegistration() {
        await this.registerButton.click();
    }
}
