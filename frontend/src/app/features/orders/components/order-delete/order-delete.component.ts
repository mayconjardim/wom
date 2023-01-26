import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrderService } from '../../services/order.service';
import { ToastrService } from 'ngx-toastr';
import { OrderUpdateComponent } from '../order-update/order-update.component';
import { Order } from '../../models/order';

@Component({
  selector: 'order-delete',
  templateUrl: './order-delete.component.html',
  styleUrls: ['./order-delete.component.scss'],
})
export class OrderDeleteComponent implements OnInit {
  order: Order = {
    expectedDate: '',
    deliveryDate: '',
    orderStatus: '',
    orderPriority: '',
    generalContractor: '',
    jobSite: '',
    address: '',
    city: '',
    description: '',
    users: [],
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private orderService: OrderService,
    private toastService: ToastrService,
    public dialogRef: MatDialogRef<OrderUpdateComponent>
  ) {}

  ngOnInit(): void {
    this.order.id = this.data.id;
    this.findOrderById();
  }

  findOrderById() {
    this.orderService.findById(this.order.id).subscribe(
      (resp) => {
        this.order = resp;
      },
      (ex) => {
        this.toastService.error(ex.error.error);
      }
    );
  }

  deleteOrder(ev: any) {
    this.orderService.delete(this.order.id).subscribe(
      (res) => {
        this.toastService.success('Order deleted successfully', 'New Order');
        this.dialogRef.close();
        location.reload();
      },
      (ex) => {
        this.toastService.error(ex.error.error);
      }
    );
  }

  close(ev: any) {
    this.dialogRef.close();
  }
}
