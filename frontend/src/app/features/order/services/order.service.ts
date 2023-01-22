import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Pagination } from '../models/order';
import { API_CONFIG } from './../../../core/config/api.config';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  [x: string]: any;
  constructor(private http: HttpClient) {}

  findAllPageable(page: number, pageSize: number): Observable<Pagination> {
    return this.http.get<Pagination>(
      `${API_CONFIG.baseUrl}/orders?page=${page}&size=${pageSize}`
    );
  }
}
