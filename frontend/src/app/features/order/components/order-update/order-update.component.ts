import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
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
    orderStatus: '0',
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

  expectedDate: FormControl = new FormControl(null, [Validators.required]);
  priority: FormControl = new FormControl(null, [Validators.required]);
  yardId: FormControl = new FormControl(null, [Validators.required]);
  generalContractor: FormControl = new FormControl(null, [Validators.required]);
  address: FormControl = new FormControl(null);
  jobSite: FormControl = new FormControl(null);
  city: FormControl = new FormControl(null);
  description: FormControl = new FormControl(null, [Validators.required]);

  constructor(
    private orderService: OrderService,
    private userService: UserService,
    private toastService: ToastrService,
    public dialogRef: MatDialogRef<OrderUpdateComponent>
  ) {}

  ngOnInit(): void {
    this.findAllUsers();
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
      this.expectedDate.valid &&
      this.priority.valid &&
      this.generalContractor.valid &&
      this.yardId.valid &&
      this.description.valid
    );
  }

  createOrder(ev: any) {
    this.order.users.push({ id: this.manager.id }, { id: this.yard.id });
    this.orderService.create(this.order).subscribe(
      (res) => {
        this.toastService.success('Order created successfully', 'New Order');
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
