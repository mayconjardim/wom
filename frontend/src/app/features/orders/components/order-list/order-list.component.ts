import { OrderDeleteComponent } from './../order-delete/order-delete.component';
import { OrderReadComponent } from './../order-read/order-read.component';
import { OrderUpdateComponent } from './../order-update/order-update.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Order } from '../../models/order';
import { OrderService } from './../../services/order.service';
import { OrderCreateComponent } from '../orders-create/order-create.component';

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

  orderByStatus(status: number) {
    this.findAllByStatusPageable(status);
  }

  isManager(): boolean {
    return localStorage.getItem('role') === 'Manager';
  }

  openDialogCreate(): void {
    this.dialog.open(OrderCreateComponent);
  }

  openDialogUpdate(id: number): void {
    this.dialog.open(OrderUpdateComponent, {
      data: { id: id },
    });
  }

  openDialogRead(id: number): void {
    this.dialog.open(OrderReadComponent, {
      data: { id: id },
    });
  }

  openDialogDelete(id: number): void {
    this.dialog.open(OrderDeleteComponent, {
      data: { id: id },
    });
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
