import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/features/users/models/user';

import { Order } from '../../models/order';
import { UserService } from './../../../users/services/user.service';
import { OrderService } from './../../services/order.service';

@Component({
  selector: 'order-update',
  templateUrl: './order-update.component.html',
  styleUrls: ['./order-update.component.scss'],
})
export class OrderUpdateComponent implements OnInit {
  events: string[] = [];

  manager: User = {
    firstName: '',
    lastName: '',
    name: '',
    email: '',
    phoneNumber: '',
    roles: [],
  };

  yard: User = {
    firstName: '',
    lastName: '',
    name: '',
    email: '',
    phoneNumber: '',
    roles: [],
  };

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

  managers!: User[];
  yards!: User[];

  deliveryDate: FormControl = new FormControl(null, [Validators.required]);
  orderStatus: FormControl = new FormControl(null, [Validators.required]);
  yardId: FormControl = new FormControl(null, [Validators.required]);
  generalContractor: FormControl = new FormControl(null, [Validators.required]);
  address: FormControl = new FormControl(null);
  jobSite: FormControl = new FormControl(null);
  city: FormControl = new FormControl(null);
  description: FormControl = new FormControl(null, [Validators.required]);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private orderService: OrderService,
    private userService: UserService,
    private toastService: ToastrService,
    public dialogRef: MatDialogRef<OrderUpdateComponent>
  ) {}

  ngOnInit(): void {
    this.order.id = this.data.id;
    this.findOrderById();
    this.findAllUsers();
  }

  debug() {
    console.log(this.order);
  }

  updateOrder(ev: any) {
    this.orderService.update(this.order).subscribe(
      (res) => {
        this.toastService.success('Order updated successfully', 'New Order');
        this.dialogRef.close();
        location.reload();
      },
      (ex) => {
        console.log(ex);
        this.toastService.error(ex.error.error);
      }
    );
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

  findAllUsers(): void {
    this.userService.findAll().subscribe((res) => {
      let users = res;

      this.managers = users.filter((user) =>
        user.roles.some((auth) => auth.authority.includes('ROLE_MANAGER'))
      );

      this.yards = users.filter((user) =>
        user.roles.some((auth) => auth.authority.includes('ROLE_YARD'))
      );

      let role = localStorage.getItem('role');

      if (role == 'Manager') {
        let userId = Number(localStorage.getItem('userId'));
        let managerObj = this.managers.find((item) => item.id === userId);
        this.manager = managerObj!;
      }
    });
  }

  getYard(ev: any) {
    let id = this.yardId.value;
    let yardObj = this.yards.find((x) => x.id == id);
    this.yard = yardObj!;
  }

  validForm(): boolean {
    return (
      this.orderStatus.valid &&
      this.generalContractor.valid &&
      this.description.valid
    );
  }

  close(ev: any) {
    this.dialogRef.close();
  }
}
