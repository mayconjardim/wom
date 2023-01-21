import { API_CONFIG } from './../../../core/config/api.config';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  findAll(): Observable<Order[]> {
    return this.http.get<Order[]>(`${API_CONFIG.baseUrl}/orders`);
  }
}
