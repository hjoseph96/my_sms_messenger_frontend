import { bootstrapApplication, provideProtractorTestingSupport } from '@angular/platform-browser';
import { LoginRegisterComponent } from './app/login-register/login-register.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';


bootstrapApplication(LoginRegisterComponent, {
  providers: [
    provideProtractorTestingSupport(),
    provideRouter(routes)
  ]
}).catch(err => console.error(err));