import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FormControl, Validators } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { OrderUpdateComponent } from '../order-update/order-update.component';
import { Order } from '../../models/order';

@Component({
  selector: 'order-read',
  templateUrl: './order-read.component.html',
  styleUrls: ['./order-read.component.scss'],
})
export class OrderReadComponent implements OnInit {
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

  description: FormControl = new FormControl(null, [Validators.required]);

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

  printPage() {
    window.print();
  }

  close(ev: any) {
    this.dialogRef.close();
  }
}
