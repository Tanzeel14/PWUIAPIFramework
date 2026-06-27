import{test,expect} from "@playwright/test"
import { LoginPage } from "../src/pages/LoginPage"
import { HomePage } from "../src/pages/HomePage"

let loginPage:LoginPage
let homePage:HomePage

test.beforeEach(async({page})=>
{
      loginPage= new LoginPage(page);
    await loginPage.gotoLoginPage();
    homePage= new HomePage(page)

})

test('login page title test',async({})=>{
   
    const title= await loginPage.getLoginPageTitle();
    console.log('page title...', title);
    expect(title).toBe('Account Login')

});


test('forgot pswd link exists test',async({})=>{
  
    expect(await loginPage.isForgotPswdLinkExists()).toBeTruthy();

});


test('user is able to login to app test',async({})=>{
    loginPage.doLogin('pwtestbatch@open.com','pw123');
    expect(await homePage.isLogoutLinkExists()).toBeTruthy();
    expect.soft(await homePage.getHomePageTitle()).toBe('My Account')
  

});

