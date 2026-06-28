
import ajv from 'ajv';
import {test,expect} from '../../src/fixtures/apifixtures'



let TOKEN= process.env.API_TOKEN;
let AUTH_HEADER={Authorization:`Bearer ${TOKEN}`}



test('GET-get a user',async({apiHelper})=>{

    let userData={
        name:' schema test',
        email:`automation_${Date.now()}@open.com`,
        gender:'female',
        status:'active'
    }

   let createResponse=  await apiHelper.post("/public/v2/users",userData,AUTH_HEADER);
   let userID=createResponse.body.id;


   //get a user
   let getUserResponse=  await apiHelper.get(`/public/v2/users/${userID}`,AUTH_HEADER);
   expect( getUserResponse.status).toBe(200)


   //schema validation code
    let validate= ajv.compile(userSchema);
    let isValidSchema= validate(getUserResponse.body);
    if(!isValidSchema){

        console.log("Schema Error: ",validate.errors );
    }

    expect(isValidSchema).tobeTruthy();


})


