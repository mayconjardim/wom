import { ToastrService } from 'ngx-toastr';
import { UserService } from './../../../users/services/user.service';
import { MatDialogRef } from '@angular/material/dialog';
import { OrderService } from './../../services/order.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/features/users/models/user';
import { Order } from '../../models/order';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.scss'],
})
export class OrderCreateComponent implements OnInit {
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
    startDate: '',
    expectedDate: '',
    orderStatus: '1',
    orderPriority: '',
    generalContractor: '',
    jobSite: '',
    address: '',
    city: '',
    description: '',
    managerName: '',
    yardName: '',
    users: [this.manager],
  };

  managers!: User[];
  yards!: User[];

  expectedDate: FormControl = new FormControl(null, [Validators.required]);
  priority: FormControl = new FormControl(null, [Validators.required]);
  yardId: FormControl = new FormControl(null, [Validators.required]);
  generalContractor: FormControl = new FormControl(null, [Validators.required]);
  description: FormControl = new FormControl(null, [Validators.required]);

  constructor(
    private orderService: OrderService,
    private userService: UserService,
    private toastService: ToastrService,
    public dialogRef: MatDialogRef<OrderCreateComponent>
  ) {}

  ngOnInit(): void {
    this.findAllUsers();
  }

  createOrder() {
    this.dialogRef.disableClose = true;
    this.orderService.create(this.order).subscribe(
      (response) => {
        this.toastService.success('Order created successfully!', 'New order');
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

  validForm(): boolean {
    return (
      this.expectedDate.valid &&
      this.priority.valid &&
      this.generalContractor.valid &&
      this.yardId.valid &&
      this.description.valid
    );
  }
}
