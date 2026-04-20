import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { API_BASE_URL } from '../constants/api.constants';
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  UserResponse
} from '../models/auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly sessionKey = 'yt_session';

  constructor(private http: HttpClient) {}

  register(request: RegisterRequest): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${API_BASE_URL}/auth/register`, request);
  }

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${API_BASE_URL}/auth/login`, request).pipe(
      tap((response) => this.saveSession(response))
    );
  }

  saveSession(session: LoginResponse): void {
    localStorage.setItem(this.sessionKey, JSON.stringify(session));
  }

  getSession(): LoginResponse | null {
    const raw = localStorage.getItem(this.sessionKey);
    return raw ? JSON.parse(raw) as LoginResponse : null;
  }

  isLoggedIn(): boolean {
    return this.getSession() !== null;
  }

  logout(): void {
    localStorage.removeItem(this.sessionKey);
  }
}