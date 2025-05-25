import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import axios, { AxiosInstance } from 'axios';
import { environment } from '../../environment';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  user: {
    email: string;
    password: string;
    password_confirmation: string;
  }
}

// {
// 	"status": {
// 		"code": 200,
// 		"message": "Signed up successfully."
// 	},
// 	"data": {
// 		"id": "683369873228dbb0d324ba71",
// 		"email": "techniquejhhhhacdz@gmail.com",
// 		"token": "4d11f4ba-2ae4-423e-98b9-6eb88da6d2ee"
// 	}
// }

export interface User {
    id: string;
    email: string;
    token: string;
}

export interface Status {
    code: number;
    message: string;
    user: User;
}
  
export interface AuthResponse {
    status: Status;
    data: any
}

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: environment.baseUrl
    });
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return from(this.client.post<AuthResponse>('/login', credentials).then(response => response.data));
  }

  signup(userData: SignupRequest): Observable<AuthResponse> {
    return from(this.client.post<AuthResponse>('/signup', userData).then(response => response.data));
  }
}