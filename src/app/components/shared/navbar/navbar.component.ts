import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiClientService } from '../../../services/api-client.service';
import { Router, RouterLink } from '@angular/router';
import { inject } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  private router = inject(Router);
  client: ApiClientService = new ApiClientService()
  
  token: string | null = null;

  ngOnInit() {
    const authHeader = localStorage.getItem('userToken')
    if (authHeader) 
      this.client = new ApiClientService(authHeader);
  }
  
  logout() {
    localStorage.removeItem('userToken');

    this.router.navigate(['/']);
  }
}