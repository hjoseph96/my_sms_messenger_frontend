import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import axios, { AxiosInstance } from 'axios';
import { environment } from '../../environment';

export interface LoginRequest {
  user: {
    email: string;
    password: string;
  }
}

export interface SignupRequest {
  user: {
    email: string;
    password: string;
    password_confirmation?: string;
  }
}

export interface NewMessageRequest {
  message: {
    receiver_phone_number: string,
    content: string
  }
}

export interface User {
    id: string;
    email: string;
    token: string;
}

export interface Status {
    code: number;
    message: string;
}
  
export interface AuthResponse {
    status: Status;
    data: User
}


export interface Message {
  id: string;
  content: string;
  receiver_phone_number: string;
  user_id: string;
}


export interface NewMessageResponse {
  status: Status,
  data: Message
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

  sendMessage(messageData: NewMessageRequest): Observable<NewMessageResponse> {
    return from(this.client.post<NewMessageResponse>('/api/v1/messages', messageData).then(response => response.data));
  }
}