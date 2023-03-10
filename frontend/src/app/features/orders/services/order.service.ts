import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Order, Pagination } from '../models/order';
import { API_CONFIG } from './../../../core/config/api.config';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  findById(id: any): Observable<Order> {
    return this.http.get<Order>(`${API_CONFIG.baseUrl}/orders/${id}`);
  }

  findAllPageable(page: number, pageSize: number): Observable<Pagination> {
    return this.http.get<Pagination>(
      `${API_CONFIG.baseUrl}/orders?page=${page}&size=${pageSize}&sort=id,desc`
    );
  }

  findAllByStatusPageable(
    status: number,
    page: number,
    pageSize: number
  ): Observable<Pagination> {
    return this.http.get<Pagination>(
      `${API_CONFIG.baseUrl}/orders/status/${status}?page=${page}&size=${pageSize}&sort=id,desc`
    );
  }

  create(order: Order): Observable<Order> {
    return this.http.post<Order>(`${API_CONFIG.baseUrl}/orders`, order);
  }

  update(order: Order): Observable<Order> {
    return this.http.put<Order>(
      `${API_CONFIG.baseUrl}/orders/${order.id}`,
      order
    );
  }

  delete(id: any): Observable<Order> {
    return this.http.delete<Order>(`${API_CONFIG.baseUrl}/orders/${id}`);
  }
}
