import { UserCreateComponent } from './../user-create/user-create.component';
import { Component, OnInit } from '@angular/core';

import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  users!: User[];

  page = 0;
  pageSize = 10;
  length!: number;

  constructor(private userService: UserService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.findAllPageable(0, 10);
  }

  findAllPageable(page: number, pageSize: number) {
    this.userService.findAllPageable(page, pageSize).subscribe((res) => {
      this.users = res.content;
      this.length = res.totalElements;
    });
  }

  openDialogCreate(): void {
    this.dialog.open(UserCreateComponent);
  }

  roleName(role: string) {
    if (role === 'ROLE_MANAGER') {
      return 'Project Manager';
    } else if (role === 'ROLE_YARD') {
      return 'Yard';
    } else return 'Admin';
  }
}
