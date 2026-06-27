import {test,expect} from '../src/fixtures/pagefixtures';
// import { HomePage } from '../src/pages/HomePage';
// import { Searchresult } from '../src/pages/Searchresults';
import {csvUtil} from '../src/utils/csvutil';




test.beforeEach(async({loginPage})=>
{
    await loginPage.gotoLoginPage();
    await loginPage.doLogin(process.env.USERNAME!,process.env.PASSWORD!)
    

});




const productData=csvUtil.readCsv('src/data/product.csv')
for(const row of productData)
{
    test(`verify search results count - ${row.searchkey} - ${row.productname}`,async({homePage,searchResultsPage})=>
{
    await homePage.doSearch(row.searchkey);
     expect(await searchResultsPage.getProductSearchResultCount()).toBe(Number(row.resultcount));
});

}

for(const row of productData)
{
test(`verify user is able to land on the product page - ${row.searchkey} - ${row.productname}`,async({homePage,searchResultsPage,page})=>{

await homePage.doSearch('macbook');
await searchResultsPage.selectProduct(row.productname)
expect(await page.title()).toBe(row.productname)
});
}

