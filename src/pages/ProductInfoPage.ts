import{Locator, Page} from "@playwright/test"
import { BasePage } from "./BasePage"

export class ProductInfoPage extends BasePage{
    //Locators
   
    private readonly header:Locator;
    private readonly productImages:Locator;
     private readonly productMetaData:Locator;
    private readonly productPricing:Locator;
    private map:Map<string,string|number>;


   

    constructor(page:Page){
         // constructor is always public
         super(page);
       
        this.header=page.getByRole('heading',{name:'Macbook Pro',level:1})
        this.productImages=page.locator('div#content li img');
        this.productMetaData=page.locator('div#content ul.list-unstyled:nth-of-type(1) li')
          this.productPricing=page.locator('div#content ul.list-unstyled:nth-of-type(2) li');
        this.map=new Map<string,string>();
};


    //public page actions
async getProductHeader():Promise<string>
{
    return await this.header.innerText();
}

async getProductImages():Promise<number>
{
    return await this.productImages.count();

}

async getProductMetaData():Promise<void>
{
    let productMetadata= await this.productMetaData.allInnerTexts();
    for(let data of productMetadata)
    {
        let meta= data.split(':');
        let metaKey= meta[0].trim();
        let metaValue= meta[1].trim();
        this.map.set(metaKey,metaValue);

    }
}
  

async getProductPricing():Promise<void>
{
    let priceData= await this.productPricing.allInnerTexts();
    let productPrice=priceData[0].trim();
    let exTaxPrice=priceData[1].split(':')[1].trim();
    this.map.set('ProductPrice',productPrice);
    this.map.set('ExTaxPrice',exTaxPrice)
}

async getProductInfo(): Promise<Map<string, string|number>>
{
    this.map.set('ProductHeader',await this.getProductHeader())
    this.map.set('ProductImages',await this.getProductImages())
    await this.getProductMetaData();
    await this.getProductPricing();
    return this.map;

}

    
}