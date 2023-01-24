import { UserService } from './../../../users/services/user.service';
import { MatDialogRef } from '@angular/material/dialog';
import { OrderService } from './../../services/order.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/features/users/models/user';
import { Order } from '../../models/order';

@Component({
  selector: 'order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.scss'],
})
export class OrderCreateComponent implements OnInit {
  order: Order = {
    startDate: '',
    expectDate: '',
    orderStatus: '1',
    orderPriority: '',
    generalContractor: '',
    jobSite: '',
    address: '',
    city: '',
    description: '',
    managerName: '',
    yardName: '',
    users: [],
  };

  managers!: User[];
  yards!: User[];

  expectedDate: FormControl = new FormControl(null, [Validators.required]);
  priority: FormControl = new FormControl(null, [Validators.required]);
  yard: FormControl = new FormControl(null, [Validators.required]);
  generalContractor: FormControl = new FormControl(null, [Validators.required]);
  description: FormControl = new FormControl(null, [Validators.required]);

  constructor(
    private orderService: OrderService,
    private userService: UserService,
    public dialogRef: MatDialogRef<OrderCreateComponent>
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
    });
  }

  validForm(): boolean {
    return (
      this.expectedDate.valid &&
      this.priority.valid &&
      this.generalContractor.valid &&
      this.yard.valid &&
      this.description.valid
    );
  }
}
