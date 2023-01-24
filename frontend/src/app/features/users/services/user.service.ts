import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { API_CONFIG } from 'src/app/core/config/api.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  findAll(): Observable<User[]> {
    return this.http.get<User[]>(`${API_CONFIG.baseUrl}/users/all`);
  }
}
