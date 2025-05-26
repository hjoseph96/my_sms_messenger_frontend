import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterOutlet, Router } from '@angular/router';
import { inject } from '@angular/core';
import { ApiClientService, Message } from '../../services/api-client.service';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { NgxIntlTelInputModule, CountryISO, SearchCountryField } from 'ngx-intl-tel-input';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterOutlet, NavbarComponent, NgxIntlTelInputModule],
  templateUrl: './send-new-message.component.html',
  styleUrl: './send-new-message.component.scss'
})
export class SendNewMessageComponent {
  private router = inject(Router);

  

  client: ApiClientService = new ApiClientService()
  sentMessages: Message[] = []

  newMessageForm: FormGroup = new FormGroup({
    phone: new FormControl("", [Validators.required]),
    content: new FormControl("", [Validators.required])
  });
  CountryISO: any;
  SearchCountryField: any;

  constructor() {
    const userToken = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')!)?.token : null;
    this.client = new ApiClientService(userToken);

    this.loadMessages();
  }


  loadMessages() {
    this.client.getMessages().subscribe({
      next: (response) => {
        this.sentMessages = response.data.data;
      },
      error: (error) => {
        console.error('Failed to load messages:', error);
      }
    });
  }


  sendMessage() {
    if (this.newMessageForm.valid)
    {
      this.client.sendMessage({
        message: {
          receiver_phone_number: this.newMessageForm.controls['phone'].value,
          content: this.newMessageForm.controls['content'].value
        }
      }).subscribe({
        next: (response) => {
          // Handle successful signup
          console.log('Message successfully sent!: ', response.data.status.message);
          
          this.loadMessages()
        },
        error: (error) => {
          // Handle signup error
          console.error('Signup failed:', error);
        }
      })
    }
  }
}
