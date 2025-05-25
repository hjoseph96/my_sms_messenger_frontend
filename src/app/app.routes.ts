import { Routes } from '@angular/router';

import { LoginRegisterComponent } from './components/login-register/login-register.component';
import { SendNewMessageComponent } from './components/send-new-message/send-new-message.component';
import { ListAllMessagesComponent } from './components/list-all-messages/list-all-messages.component';

export const routes: Routes = [
  { path: '', component: LoginRegisterComponent },
  { path: 'send-message', component: SendNewMessageComponent },
  { path: 'list-messages', component: ListAllMessagesComponent }
];
