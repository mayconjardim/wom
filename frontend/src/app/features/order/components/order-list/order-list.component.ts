import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

import { Order, Pagination } from '../../models/order';
import { OrderService } from './../../services/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit {
  orders!: Order[];

  page = 0;
  pageSize = 10;
  length!: number;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.findAllPageable(0, 10);
  }

  findAllPageable(page: number, pageSize: number) {
    this.orderService.findAllPageable(page, pageSize).subscribe((res) => {
      this.orders = res.content;
      this.length = res.totalElements;
    });
  }

  pageChangeEvent(event: number) {
    this.page = event;
    this.findAllPageable(this.page - 1, this.pageSize);
  }
}
