import{Locator, Page} from "@playwright/test"
import { BasePage } from "./BasePage"

export class Searchresult extends BasePage{
    //Locators
   
    private readonly searchResults:Locator;


   

    constructor(page:Page){
         // constructor is always public
         super(page);
       
        this.searchResults=page.locator('div.product-layout');
};


    //public page actions
 

    async getProductSearchResultCount():Promise<number>
    {
        return await this.searchResults.count();
    }

    
    async selectProduct(productName:string):Promise<void>
    {
       await this.page.getByRole('link',{name:productName,exact:true}).first().click();
    }

  

    
}