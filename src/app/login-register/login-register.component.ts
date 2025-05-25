import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgForm, ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
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

  registerNewUser() {
    debugger;
    
    // TODO: Implement user registration logic
    console.log('Register new user called');
  }
}
