// goto web app and intercept the network calls and log them
//**= wildcard--matches all the URLs 
import{test,expect} from '@playwright/test'


test('intercept and log requests',async({page})=>{

await page.route('**/*',async(route)=>{

    console.log(route.request().method(),route.request().url);
   await route.continue();// this will go to url 1--capture continue...got to url 2..capture and continue
});
await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=common/home')

})

//intercept with mocking
//mocking:fake data/response

test('mock the search data api',async({page})=>{
let fakeProducts=[

    {name:'Fake MacBook Pro',price:"$599"},
    {name:'Fake iphone 20',price:"$239"}
    
];

await page.route('**/index.php?route=product/search&search=macbook',(route)=>{

    route.fulfill({
        status:200,
        contentType:'application/json',
        body:JSON.stringify(fakeProducts)
    });
});
await page.goto('https://naveenautomationlabs.com/index.php?route=product/search&search=macbook')

let fakeJSON= await page.evaluate(async()=>{
   let fetchResponse= await fetch('https://naveenautomationlabs.com/index.php?route=product/search&search=macbook')
   return await fetchResponse.json();
});

console.log('fake json response',fakeJSON

    
);
})