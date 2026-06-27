import{test,expect} from "@playwright/test"
import { LoginPage } from "../src/pages/LoginPage"
import { HomePage } from "../src/pages/HomePage"


let loginPage:LoginPage
let homePage:HomePage

test.beforeEach(async({page})=>
{
      loginPage= new LoginPage(page);
    await loginPage.gotoLoginPage();
   await loginPage.doLogin('pwtestbatch@open.com','pw123');
   homePage= new HomePage(page)

})


test('home page title test',async({})=>{
   
    const title= await homePage.getHomePageTitle();
    console.log('home page title...', title);
    expect(title).toBe('My Account')

});

test('logout link exists test',async({})=>{
  
    expect(await homePage.isLogoutLinkExists()).toBeTruthy();

});


test('home page headers test',async({})=>{
    let allHeaders=await homePage.getHomePageHeaders()
    console.log('home page headers', allHeaders);
  
    expect.soft(allHeaders).toHaveLength(4);
    expect.soft(allHeaders).toEqual([
        'My Account',
        'My Orders',
        'My Affiliate Account',
        'Newsletter'
    ])


});