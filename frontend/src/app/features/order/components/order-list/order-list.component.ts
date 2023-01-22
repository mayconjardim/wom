import { Component, OnInit } from '@angular/core';

import { Order, Pagination } from '../../models/order';
import { OrderService } from './../../services/order.service';
import { MatPaginator } from '@angular/material/paginator';

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
  totalPages!: number;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.findAllPageable();
  }

  findAllPageable() {
    this.orderService
      .findAllPageable(this.page, this.pageSize)
      .subscribe((res) => {
        this.pages = res;
        this.orders = this.pages.content;
        this.totalPages = res.totalPages;
      });
  }

  onPageChange(event: MatPaginator) {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.findAllPageable();
  }
}
