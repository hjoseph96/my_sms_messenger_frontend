import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

import { ApiClientService } from '../../services/api-client.service';

import { RouterModule, Router } from '@angular/router';
import { inject } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],

  templateUrl: './login-register.component.html',
  styleUrl: './login-register.component.scss'
})
export class LoginRegisterComponent {
  title = 'My SMS Messenger';

  registerForm: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.email, Validators.required]),
    password: new FormControl("", [Validators.required, Validators.minLength(7)]),
    passwordConfirmation: new FormControl("", [Validators.required, Validators.minLength(7)])
  });

  loginForm: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.email, Validators.required]),
    password: new FormControl("", [Validators.required, Validators.minLength(7)]),
  })

  client: ApiClientService = new ApiClientService()
  
  private router = inject(Router);


  registerNewUser() {
    if (this.registerForm.valid) {
      const email = this.registerForm.controls['email'].value
      const password = this.registerForm.controls['password'].value
      const passwordConfirmation = this.registerForm.controls['passwordConfirmation'].value

      this.client.signup({
        user: {
          email: email,
          password: password,
          password_confirmation: passwordConfirmation
        }
      }).subscribe({
          next: (response) => {
            // Handle successful signup
            console.log('Signup successful: ', response.status.message);
            const user = response.data;

            localStorage.setItem('currentUser', JSON.stringify(user));

            this.router.navigate(['/send-message']);
          },
          error: (error) => {
            // Handle signup error
            console.error('Signup failed:', error);
          }
        })

    }
  }

  loginUser() {

  }
}
