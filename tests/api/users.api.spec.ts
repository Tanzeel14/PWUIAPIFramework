import{test,expect} from '@playwright/test'

let AUTH_TOKEN={Authorization:'Bearer 06f961a6be81a6efd57bb13852ea64bdca2bce2fb8fc59823dd59f553ed9af44'};

test('get all user test',async({request})=>{
    let response= await request.get('https://gorest.co.in/public/v2/users',{
        
        headers:AUTH_TOKEN,
    });
    let jsonBody=await response.json();
    console.log(jsonBody);
    
    console.log(response.status());
    console.log(response.statusText());



});


test('get  specific user test',async({request})=>{
    let response= await request.get('https://gorest.co.in/public/v2/users/8506390',{
        
        headers:AUTH_TOKEN,
    });
    let jsonBody=await response.json();
    console.log(jsonBody);
    
    console.log(response.status());
     console.log(response.statusText());
     expect(response.status()).toBe(200);



});




test('create a user test',async({request})=>{

    let userData={
        name:'simmik',
        email:`automation_${Date.now()}@pw.com`,
        gender:'female',
        status:'active'
    };

    let response=await request.post('https://gorest.in/public/v2/users',{

        headers:AUTH_TOKEN,
        data:userData
    });

    let jsonBody=await response.json();
    console.log(jsonBody);

    console.log(response.status());
    console.log(response.statusText());
})


test('update a user test',async({request})=>{

    let userData={
        name:'simmik',
        email:`automation_${Date.now()}@pw.com`,
        gender:'male',
        status:'inactive'
    };

    let response=await request.put('https://gorest.co.in/public/v2/users/8506431',{

        headers:AUTH_TOKEN,
        data:userData
    });

    let jsonBody=await response.json();
    console.log(jsonBody);

    console.log(response.status());
    console.log(response.statusText());
})



test('delete a user test',async({request})=>{


    let response=await request.delete('https://gorest.co.in/public/v2/users/8506431',{

        headers:AUTH_TOKEN,
        
    });



    console.log(response.status());//204
    console.log(response.statusText());// no content
})
