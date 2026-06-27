import{test,expect} from "../src/fixtures/pagefixtures"





test.beforeEach(async({loginPage})=>
{
      
    await loginPage.gotoLoginPage();
   await loginPage.doLogin('pwtestbatch@open.com','pw123');
   

})


test('home page title test',async({homePage})=>{
   
    const title= await homePage.getHomePageTitle();
    console.log('home page title...', title);
    expect(title).toBe('My Account')

});

test('logout link exists test',async({homePage})=>{
  
    expect(await homePage.isLogoutLinkExists()).toBeTruthy();

});


test('home page headers test',async({homePage})=>{
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