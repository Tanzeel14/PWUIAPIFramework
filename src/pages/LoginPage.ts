import{Locator, Page} from "@playwright/test"
import { BasePage } from "./BasePage"

export class LoginPage extends BasePage{
    //Locators
    private readonly emailId:Locator //private so that no one access outside ths class; readonly so that no one can change
    private readonly password:Locator
    private readonly loginBtn:Locator
    private readonly forgotPswdLink:Locator
    private readonly logo:Locator
    private readonly loginErrorMsg:Locator;

    constructor(page:Page){
         // constructor is always public
         super(page);
        this.emailId= page.getByRole('textbox', { name: 'E-Mail Address' });
        this.password= page.getByRole('textbox', { name: 'Password' });
        this.loginBtn=page.getByRole('button', { name: 'Login' });
        this.forgotPswdLink=page.getByRole('link', { name: 'Forgotten Password' }).first();
        this.logo=page.getByAltText('naveenopencart');
        this.loginErrorMsg= page.locator('.alert.alert-danger.alert-dismissible');
       
    };


    //public page actions
    async gotoLoginPage(){
        await this.page.goto('opencart/index.php?route=account/login')

    }

    async getLoginPageTitle():Promise<String>
    {
        return await this.page.title();
    }

    async isForgotPswdLinkExists():Promise<boolean>
    {
       return await this.forgotPswdLink.isVisible();
    }

    async doLogin(username:string,pswd:string):Promise<void>
    {
        await this.emailId.fill(username);
        await this.password.fill(pswd);
        await this.loginBtn.click();
    }


    async isInvalidLoginMsgDisplayed():Promise<boolean>
    {
        return await this.loginErrorMsg.isVisible();
    }

    
}