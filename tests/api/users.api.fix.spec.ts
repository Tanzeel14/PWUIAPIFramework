import process from 'node:process';
import {test,expect} from '../../src/fixtures/apifixtures';


const TOKEN= process.env.API_TOKEN;
let AUTH_HEADER= {Authorization:`Bearer ${TOKEN}`};
let userId:number;

test.describe.serial('running e2e go rest crud operations',()=>{


    test('GET API---get all users',async({apiHelper})=>{

    let response= await apiHelper.get('/public/v2/users',AUTH_HEADER)

    expect(response.status).toBe(200)
    expect(response.body.length).toBeGreaterThan(0);


});


test('POST API---get all users',async({apiHelper})=>{

      let userData={
        name:'monis',
        email:`automation_${Date.now()}@pw.com`,
        gender:'male',
        status:'active'
    };

    let response= await apiHelper.post('/public/v2/users',userData,AUTH_HEADER)

    expect(response.status).toBe(201)
    expect(response.body.name).toBe(userData.name);
     userId= response.body.id;
    console.log('Created User Id: ',userId);


});



test('PUT API---update user',async({apiHelper})=>{

      let userUpdatedData={
        gender:'female',
      status:'active'
    };

    let response= await apiHelper.put(`/public/v2/users/${userId}`,userUpdatedData,AUTH_HEADER)

    expect(response.status).toBe(200)
    expect(response.body.gender).toBe(userUpdatedData.gender);
     expect(response.body.status).toBe(userUpdatedData.status);
 


});


test('DELETE API---delete user',async({apiHelper})=>{

   

    let response= await apiHelper.delete(`/public/v2/users/${userId}`,AUTH_HEADER)

    expect(response.status).toBe(204)
   
 


});


})


//Get test
