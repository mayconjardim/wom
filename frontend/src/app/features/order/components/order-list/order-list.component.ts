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
  panelOpenState = false;
  orders!: Order[];
  pages!: Pagination;

  page = 0;
  pageSize = 10;
  length!: number;
  pageEvent!: PageEvent;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.findAllPageable(0, 10);
  }

  findAllPageable(page: number, pageSize: number) {
    this.orderService.findAllPageable(page, pageSize).subscribe((res) => {
      this.pages = res;
      this.orders = this.pages.content;
      this.length = res.totalPages;
    });
  }
}
