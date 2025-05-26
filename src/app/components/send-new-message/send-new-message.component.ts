import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterOutlet, Router } from '@angular/router';
import { inject } from '@angular/core';
import { ApiClientService } from '../../services/api-client.service';
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

  newMessageForm: FormGroup = new FormGroup({
    phone: new FormControl("", [Validators.required]),
    content: new FormControl("", [Validators.required])
  });


  sendMessage() {

  }
}
