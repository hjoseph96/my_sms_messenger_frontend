import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterOutlet, Router } from '@angular/router';
import { inject } from '@angular/core';
import { ApiClientService } from '../../services/api-client.service';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';


@Component({
  selector: 'app-send-new-message',
  standalone: true,
  imports: [ReactiveFormsModule, RouterOutlet, NavbarComponent, NgxIntlTelInputModule],
  templateUrl: './send-new-message.component.html',
  styleUrl: './send-new-message.component.scss'
})
export class SendNewMessageComponent {
  private router = inject(Router);



  sendMessage() {

  }
}
