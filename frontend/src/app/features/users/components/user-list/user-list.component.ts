import { Component, OnInit } from '@angular/core';

import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

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

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.findAllPageable(0, 10);
  }

  findAllPageable(page: number, pageSize: number) {
    this.userService.findAllPageable(page, pageSize).subscribe((res) => {
      this.users = res.content;
      this.length = res.totalElements;
    });
  }

  roleName(role: string) {
    if (role === 'ROLE_MANAGER') {
      return 'Project Manager';
    } else if (role === 'ROLE_YARD') {
      return 'Yard';
    } else return 'Admin | ';
  }
}
