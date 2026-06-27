import{Locator, Page} from "@playwright/test"
import { BasePage } from "./BasePage"

export class HomePage extends BasePage{
    //Locators
   
    private readonly logoutLink:Locator
    private readonly headers:Locator
    private readonly searchBox: Locator
    private readonly searchIcon: Locator
 

   

    constructor(page:Page){
         // constructor is always public
         super(page);
       
        this.logoutLink=page.getByRole('link', { name: 'Logout' }).first();
        this.headers= page.getByRole('heading',{level:2})
        this.searchBox= page.getByRole('textbox', { name: 'Search' });
        this.searchIcon=page.locator('div#search button');
      
     
    };


    //public page actions
 

    async getHomePageTitle():Promise<String>
    {
        return await this.page.title();
    }

    async isLogoutLinkExists():Promise<boolean>
    {
       return await this.logoutLink.isVisible();
    }

    async getHomePageHeaders():Promise<string[]>
    {
       return await this.headers.allInnerTexts()
    }

    async doSearch(searchkey:string):Promise<void>
    {
        console.log((`Search key: ${searchkey}`));
        await this.searchBox.fill(searchkey);
        await this.searchIcon.click();
    }

    
}