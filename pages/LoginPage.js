import{test} from "@playwright/test"
export class LoginPage{
    constructor(page){
        this.page=page
        //Locators
        this.loginLink= page.getByRole('link' , { name : 'Log in'})
        this.userName = page.locator("[name='Email']")
        this.passWord = page.locator("[name='Password']")
        this.loginButton = page.locator("//input[@value='Log in']");
        this.logoutLink = page.getByRole(' link' , {name: 'Log out'});
    }

    async gotoLoginPage(){
        await this.page.goto('/');
    };

    async clickLogInLink(){
        await this.loginLink.click()
    }

    async enterUsername(){
        await this.userName.fill('jhon.doe@yopmail.com');
    };

    async enterPassword (){
        await this.passWord.fill("Jhon@123");
    }
    
    async clickLoginButton(){
        await this.loginButton.click();
    };

    async login(){
        await this.gotoLoginPage();
        await this.clickLogInLink();
        await this.enterUsername();
        await this.enterPassword();
        await this.clickLoginButton();
    }

}