import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterOutlet, Router } from '@angular/router';
import { inject } from '@angular/core';
import { ApiClientService } from '../../services/api-client.service';
import { NavbarComponent } from '../shared/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule, RouterOutlet, CommonModule, NavbarComponent],
  templateUrl: './login-register.component.html',
  styleUrl: './login-register.component.scss'
})
export class LoginRegisterComponent {
  title = 'My SMS Messenger';

  private router = inject(Router);

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

  ngOnInit() {
    const storedToken = localStorage.getItem('userToken')

    if (storedToken)
    {
      this.router.navigate(['/send_message']);
    }
  }
  

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
            // Store JWT in localStorage
            localStorage.setItem('userToken', response.headers.authorization)

            this.router.navigate(['/send_message']);
          },
          error: (error) => {
            // Handle signup error
            console.error('Signup failed:', error);
          }
        })

    }
  }

  loginUser() {
    if (this.loginForm.valid) {
      const email = this.loginForm.controls['email'].value
      const password = this.loginForm.controls['password'].value

      this.client.login({
        user: {
          email: email,
          password: password
        }
      }).subscribe({
          next: (response) => {
            // Store JWT in localStorage
            localStorage.setItem('userToken', response.headers.authorization);

            this.router.navigate(['/send_message']);
          },
          error: (error) => {
            // Handle signup error
            console.error('Signup failed:', error);
          }
        })

    }
  }
}
