
// fixtures help to maintain objects at one place and objects can be supplied to test
import {test as baseTest} from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { HomePage } from '../pages/HomePage'
import { Searchresult } from '../pages/Searchresults';
import { csvUtil } from '../utils/csvutil';
import { ProductInfoPage } from '../pages/ProductInfoPage';
import { BasePage } from '../pages/BasePage';

//define types for page fixtures
type pageFixtures={
    basePage:BasePage,
    loginPage:LoginPage,
    homePage:HomePage,
    searchResultsPage:Searchresult,
    testData:Record<string,string>[],
    productInfoPage:ProductInfoPage
};


//extend playwright base test
export let test= baseTest.extend<pageFixtures>({ // <> refers to what type of fixture will be maintained
    loginPage:async({page},use)=>{

let loginPage= new LoginPage(page)
await use(loginPage);

    },




  homePage: async ({ page }, use) => {
         let homePage = new HomePage(page);
         await use(homePage);
     },

       productInfoPage: async ({ page }, use) => {
         let productInfoPage = new ProductInfoPage(page);
         await use(productInfoPage);
     },


 testData:async({},use)=>{

    let testData=csvUtil.readCsv('src/data/loginData.csv');
   await use(testData);
 },

searchResultsPage: async ({ page }, use) => {
         let searchResultPage = new Searchresult(page);
         await use(searchResultPage);
     }


});


export {expect } from '@playwright/test';