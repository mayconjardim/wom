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
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic bXljbGllbnRpZDpteWNsaWVudHNlY3JldA==',
      Accept: '*/*',
      grant_type: 'password',
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

  successfulLogin(authToken: string) {
    localStorage.setItem('token', authToken);
  }

  isAuthenticated() {
    let token = localStorage.getItem('token');
    if (token === null) {
      return !this.jwtService.isTokenExpired(token);
    }
    return false;
  }
}
