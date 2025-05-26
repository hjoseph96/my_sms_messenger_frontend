import { isDevMode } from '@angular/core';

let env = {
    production: false,
    // baseUrl: 'https://my-sms-messenger-api-8fac18b6169c.herokuapp.com'  
    baseUrl: 'http://localhost:3001'
};



if (!isDevMode()) {
  env.production = true;
}

export const environment = env