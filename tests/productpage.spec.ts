import {test,expect} from '../src/fixtures/pagefixtures';
import { HomePage } from '../src/pages/HomePage';
import { Searchresult } from '../src/pages/Searchresults';
import { csvUtil } from '../src/utils/csvutil';




test.beforeEach(async({loginPage})=>
{
    await loginPage.gotoLoginPage();
    await loginPage.doLogin(process.env.USERNAME!,process.env.PASSWORD!)
    //homePage= new HomePage(page)

});

test('logo exists on product page',async({productInfoPage})=>{

expect( await productInfoPage.isLogoVisible()).toBeTruthy();
})

test('verify product images count',async({HomePage}))


test('verify product information/Data', async({homePage}))