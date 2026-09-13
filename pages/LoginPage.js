export class LoginPage{
    constructor(page){
        this.page=page
        //Locators
        this.loginLink= page.getByRole('link' , { name : 'Log in'})
        this.userName = page.getByRole('textbox', { name: 'Email:' })
        this.passWord = page.getByRole('textbox', { name: 'Password:' })
        this.rememberMe = page.getByRole('checkbox', { name: 'Remember me?' })
        this.loginButton = page.getByRole('button', { name: 'Log in' });
        this.logoutLink = page.getByRole('link', { name: 'Log out' });
        this.forgotPasswordLink = page.getByRole('link', { name: 'Forgot password?' });
        this.registerButton = page.getByRole('button', { name: 'Register' });
        this.loginError = page.getByText('Login was unsuccessful. Please correct the errors and try again.');
        this.accountNotFoundError = page.getByText('No customer account found');
    }

    async gotoLoginPage(){
        await this.page.goto('/login');
    };

    async clickLogInLink(){
        await this.loginLink.click()
    }

    async enterUsername(username){
        await this.userName.fill(username);
    };

    async enterPassword (password){
        await this.passWord.fill(password);
    }
    
    async clickLoginButton(){
        await this.loginButton.click();
    };

    async login(username = process.env.USERNAME, password = process.env.PASSWORD){
        if (!username || !password) {
            throw new Error('USERNAME and PASSWORD must be set in the selected .env file');
        }

        await this.gotoLoginPage();
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLoginButton();
    }

}