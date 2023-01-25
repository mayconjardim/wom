import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Order } from '../../models/order';
import { OrderService } from './../../services/order.service';
import { OrderCreateComponent } from './../order-create/order-create.component';

@Component({
  selector: 'order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit {
  orders!: Order[];

  page = 0;
  pageSize = 10;
  length!: number;

  constructor(private orderService: OrderService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.findAllPageable(0, 10);
  }

  findAllPageable(page: number, pageSize: number) {
    this.orderService.findAllPageable(page, pageSize).subscribe((res) => {
      this.orders = res.content;
      this.length = res.totalElements;
    });
  }

  findAllByStatusPageable(status: number) {
    this.orderService
      .findAllByStatusPageable(status, this.page, this.pageSize)
      .subscribe((res) => {
        this.orders = res.content;
        this.length = res.totalElements;
      });
  }

  orderStatus(status: number) {
    this.findAllByStatusPageable(status);
  }

  openCreate(): void {
    this.dialog.open(OrderCreateComponent);
  }

  pageChangeEvent(event: number) {
    this.page = event;
    this.findAllPageable(this.page - 1, this.pageSize);

    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
