import { Role } from './../../features/users/models/role';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Credentials } from 'src/app/shared/models/credentials';
import { JwtHelperService } from '@auth0/angular-jwt';
import { API_CONFIG } from './../config/api.config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  jwtService: JwtHelperService = new JwtHelperService();

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'Basic bXljbGllbnRpZDpteWNsaWVudHNlY3JldA==',
      grant_type: 'password',
      Accept: '*/*',
    }),
  };

  constructor(private http: HttpClient) {}

  authenticate(creds: Credentials) {
    const body = new HttpParams()
      .set('username', creds.username)
      .set('password', creds.password)
      .set('grant_type', 'password');

    return this.http.post(
      `${API_CONFIG.baseUrl}/oauth/token`,
      body,
      this.httpOptions
    );
  }

  successfulLogin(
    authToken: string,
    userName: string,
    userId: string,
    role: string,
    admin: string
  ) {
    localStorage.setItem('token', authToken);
    localStorage.setItem('userName', userName);
    localStorage.setItem('userId', userId);
    localStorage.setItem('role', role);
    localStorage.setItem('admin', admin);
  }

  isAuthenticated() {
    let token = localStorage.getItem('token');
    if (token != null) {
      return !this.jwtService.isTokenExpired(token);
    }
    return false;
  }

  logout() {
    localStorage.clear();
  }
}
