import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination, User } from '../models/user';
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

  findAllPageable(page: number, pageSize: number): Observable<Pagination> {
    return this.http.get<Pagination>(
      `${API_CONFIG.baseUrl}/users?page=${page}&size=${pageSize}&sort=id,desc`
    );
  }

  findById(id: any): Observable<User> {
    return this.http.get<User>(`${API_CONFIG.baseUrl}/users/${id}`);
  }

  findByUpdateId(id: any): Observable<User> {
    return this.http.get<User>(`${API_CONFIG.baseUrl}/users/update/${id}`);
  }

  create(user: User): Observable<User> {
    return this.http.post<User>(`${API_CONFIG.baseUrl}/users`, user);
  }

  update(user: User): Observable<User> {
    return this.http.put<User>(`${API_CONFIG.baseUrl}/users/${user.id}`, user);
  }

  delete(id: any): Observable<User> {
    return this.http.delete<User>(`${API_CONFIG.baseUrl}/users/${id}`);
  }

}
