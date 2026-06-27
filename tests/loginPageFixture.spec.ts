//import { env } from 'node:process';
import {test,expect} from '../src/fixtures/pagefixtures'
import process from 'node:process';
import { JsonHelper } from '../src/utils/JsonHelper';
import { csvUtil } from '../src/utils/csvutil';
import { excelHelper } from '../src/utils/excelhelper';


test.beforeEach(async({loginPage,homePage})=>
{
    await loginPage.gotoLoginPage();
    //homePage= new HomePage(page)

});

test('login page title test',async({loginPage})=>{
   
    const title= await loginPage.getLoginPageTitle();
    console.log('page title...', title);
    expect(title).toBe('Account Login')

});

test('forgot pswd link exists test',async({loginPage})=>{
  
    expect(await loginPage.isForgotPswdLinkExists()).toBeTruthy();

});


test('user is able to login to app test',async({loginPage,homePage})=>{
    //! is for null check

    loginPage.doLogin(process.env.USERNAME!,process.env.PASSWORD!);
    expect(await homePage.isLogoutLinkExists()).toBeTruthy();
    expect.soft(await homePage.getHomePageTitle()).toBe('My Account')
  

});

// DD.1 sequential mode- in this approach only one single test runs with test data one by one
test('login to app using wrong creds with data driven test',async({loginPage,testData})=>{

  for(let row of testData)
  {
    await loginPage.doLogin(row.username, row.password)
    expect(await loginPage.isInvalidLoginMsgDisplayed()).toBeTruthy();
  }
  

});

//DD 2. without fixtures in parallel mode; read the csv data directly and loop the test method row wise..
 let testData= csvUtil.readCsv('src/data/loginData.csv')

 for(let row of testData)
 {
     test(`invalid login test- ${row.username} - ${row.password}`,async({loginPage})=>{
         await loginPage.doLogin(row.username, row.password)
             expect (await loginPage.isInvalidLoginMsgDisplayed()).toBeTruthy();
    });
 };

 // data with ExcelHelper

 let testDataExcel=excelHelper.readExcel('src/data/excelData.xlsx','login')
 for(let row of testDataExcel)
 {
      test(`invalid login excel- ${row.username} - ${row.password}`,async({loginPage})=>{
         await loginPage.doLogin(row.username, row.password)
             expect (await loginPage.isInvalidLoginMsgDisplayed()).toBeTruthy();
    });
 }



let loginJsonData= JsonHelper.readJson('src/data/loginData.json')

for(let row of loginJsonData)
{
      test(`invalid login test with JSON data - ${row.username} - ${row.password}`,async({loginPage})=>{

        await loginPage.doLogin(row.username,row.password);
        expect(await loginPage.isInvalidLoginMsgDisplayed()).toBeTruthy();
});
};