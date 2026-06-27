import {test as baseTest} from '@playwright/test'
import { ApiHelper } from '../api/ApiHelper'


//define type of apifixture
type ApiFixture={

    apiHelper: ApiHelper;
}

export let test= baseTest.extend<ApiFixture>({
    
    // <> refers to what type of fixture will be maintained
    apiHelper:async({request},use)=>{

let apihelper= new ApiHelper(request,
    
    process.env.API_BASE_URL!);
    
await use(apihelper);
    },

    });

    export{expect} from  '@playwright/test'