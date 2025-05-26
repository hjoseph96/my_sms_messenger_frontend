import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterOutlet, Router } from '@angular/router';
import { inject } from '@angular/core';
import { ApiClientService, Message } from '../../services/api-client.service';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { NgxIntlTelInputModule, CountryISO, SearchCountryField, PhoneNumberFormat } from 'ngx-intl-tel-input';


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
  SearchCountryField = SearchCountryField;
	CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
	preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];

  sentMessages: any[] = []

  newMessageForm: FormGroup = new FormGroup({
    phone: new FormControl("", [Validators.required]),
    content: new FormControl("", [Validators.required])
  });

  constructor() {
    const authHeader = localStorage.getItem('userToken')
    if (authHeader) 
      this.client = new ApiClientService(authHeader);

    this.loadMessages();
  }

  loadMessages() {
    this.client.getMessages().subscribe({
      next: (response) => {
        this.sentMessages = (response.data as any) as Message[];
      },
      error: (error) => {
        console.error('Failed to load messages:', error);
      }
    });
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleString();
  }

  sendMessage() {
    if (this.newMessageForm.valid)
    {
      this.client.sendMessage({
        message: {
          receiver_phone_number: this.newMessageForm.controls['phone'].value.internationalNumber,
          content: this.newMessageForm.controls['content'].value
        }
      }).subscribe({
        next: (response) => {
          // Handle successful signup
          console.log('Message successfully sent!: ', response.data.message.content);
          
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
