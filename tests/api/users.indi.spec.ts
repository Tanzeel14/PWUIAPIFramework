import process from 'node:process';
import { ApiHelper } from '../../src/api/ApiHelper';
import {test,expect} from '../../src/fixtures/apifixtures'


const TOKEN= process.env.API_Token;
let AUTH_HEADER= {Authorization:`Bearer ${TOKEN}`};
let userId:number;

//helper function-- create a fresh user

async function createUser(apiHelper:any) {

    let userData={
            name:'simmik',
            email:`automation_${Date.now()}@pw.com`,
            gender:'male',
            status:'inactive'
        };
    
        let response= await apiHelper.post('/public/v2/users',userData,AUTH_HEADER)
    
        expect(response.status).toBe(201)
      return response.body;
    
    
    }

    //TEST 1

    test('POST-Create a user ',async({apiHelper})=>{


        let userResponse= await createUser(apiHelper);
        //get the user

        
         let response= await apiHelper.get(`/public/v2/users/${userResponse.id}`,AUTH_HEADER);
         expect(response.status).toBe(200)
         expect(response.body.name).toBe("simmik");
    })


    //TEST 2- Update a user test+verify 


        test('PUT-Update a user ',async({apiHelper})=>{

    let userUpdatedData={
        name:'simmik',
      status:'active'
    };

    //CREATE a user- POST
        let userResponse= await createUser(apiHelper);
        //get the user

        
        //UPDATE THE USER
         let response= await apiHelper.put(`/public/v2/users${userResponse.id}`,userUpdatedData,AUTH_HEADER)
         expect(response.status).toBe(200)
         expect(response.body.name).toBe(userUpdatedData.name);
             expect(response.body.status).toBe(userUpdatedData.status);



              let getresponse= await apiHelper.get(`/public/v2/users/${userResponse.id}`,AUTH_HEADER)
         expect(getresponse.status).toBe(200)
         expect(getresponse.body.name).toBe(userUpdatedData.name);
         expect(getresponse.body.status).toBe(userUpdatedData.status);
    })


    //TEST-3 DELETE user

    test('Delete a user ',async({apiHelper})=>{

 

    //CREATE a user- POST
        let userResponse= await createUser(apiHelper);
        //delete the user

    
              let response= await apiHelper.delete(`/public/v2/users/${userResponse.id}`,AUTH_HEADER)
         expect(response.status).toBe(204)


         //get the user

         
              let getresponse= await apiHelper.get(`/public/v2/users/${userResponse.id}`,AUTH_HEADER)
         expect(getresponse.status).toBe(404);
         expect(getresponse.body.message).toBe("Resource not found")


       


    })

