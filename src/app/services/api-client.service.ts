import { Injectable, Inject, Optional } from '@angular/core';
import { Observable, from } from 'rxjs';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
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
    user: User
}

export interface Message {
  id: string;
  content: string;
  receiver_phone_number: string;
  user_id: string;
}

export interface NewMessageResponse {
  message: any;
  status: Status,
  data: Message
}

export interface MessagesResponse {
  headers: any
  data: Message[];
}

export interface ApiResponse<T> {
  data: T;
  headers: any;
}

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {
  private client: AxiosInstance;

  constructor(@Optional() @Inject('API_TOKEN') private token?: string) {
    this.client = axios.create({
      baseURL: environment.baseUrl
    });
  }

  login(credentials: LoginRequest): Observable<ApiResponse<AuthResponse>> {
    return from(this.client.post<AuthResponse>('/login', credentials)
      .then((response: AxiosResponse) => ({ data: response.data, headers: response.headers })));
  }

  signup(userData: SignupRequest): Observable<ApiResponse<AuthResponse>> {
    return from(this.client.post<AuthResponse>('/signup', userData)
      .then((response: AxiosResponse) => ({ data: response.data, headers: response.headers })));
  }


  logout(): Observable<ApiResponse<AuthResponse>> {
    return from(this.client.delete<AuthResponse>('/logout', {
      headers: { Authorization: this.token }
    }).then((response: AxiosResponse) => ({ data: response.data, headers: response.headers })));
  }

  sendMessage(messageData: NewMessageRequest): Observable<ApiResponse<NewMessageResponse>> {
    return from(this.client.post<AuthResponse>('/api/v1/messages', messageData, {
      headers: { Authorization: this.token }
    })
      .then((response: AxiosResponse) => ({ data: response.data, headers: response.headers })));
  }

  getMessages(): Observable<ApiResponse<Message>> {
    return from(this.client.get<AuthResponse>('/api/v1/messages', {
      headers: { Authorization: this.token }
    }).then((response: AxiosResponse) => ({ data: response.data, headers: response.headers })));
  }
}