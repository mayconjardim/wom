import { MatDialogRef } from '@angular/material/dialog';
import { OrderService } from './../../services/order.service';
import { Component } from '@angular/core';

@Component({
  selector: 'order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.scss'],
})
export class OrderCreateComponent {
  constructor(
    private orderService: OrderService,
    public dialogRef: MatDialogRef<OrderCreateComponent>
  ) {}
}
