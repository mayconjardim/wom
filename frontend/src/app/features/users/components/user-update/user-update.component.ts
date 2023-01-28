import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, of, tap } from 'rxjs';

import { User } from '../../models/user';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss'],
})
export class UserUpdateComponent implements OnInit {
  user: User = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    roles: [],
  };

  roles = this.formBuilder.group({
    admin: false,
    manager: false,
    yard: false,
  });

  firstName: FormControl = new FormControl(null, [Validators.required]);
  lastName: FormControl = new FormControl(null, [Validators.required]);
  email: FormControl = new FormControl(null, [Validators.email]);
  phoneNumber: FormControl = new FormControl(null, [Validators.required]);
  password: FormControl = new FormControl(null, [Validators.minLength(3)]);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    public dialogRef: MatDialogRef<UserUpdateComponent>,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private toastService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.findByUpdateId();
  }

  debug() {
    console.log(this.user);
  }

  findByUpdateId() {
    this.userService.findByUpdateId(this.data.id).subscribe(
      (resp) => {
        this.user = resp;

        let admin = this.user.roles.some((auth) =>
          auth.authority.includes('ROLE_ADMIN')
        );

        let manager = this.user.roles.some((auth) =>
          auth.authority.includes('ROLE_MANAGER')
        );

        let yard = this.user.roles.some((auth) =>
          auth.authority.includes('ROLE_YARD')
        );

        this.roles.get('admin')?.setValue(admin);
        this.roles.get('manager')?.setValue(manager);
        this.roles.get('yard')?.setValue(yard);
      },
      (ex) => {
        this.toastService.error(ex.error.error);
      }
    );
  }

  updateOrder() {
    this.user.id = this.data.id;
    this.user.roles = [];

    const rolesToCheck = [
      { name: 'admin', id: 1 },
      { name: 'manager', id: 2 },
      { name: 'yard', id: 3 },
    ];

    rolesToCheck.forEach((roleToCheck) => {
      const role = this.roles.get(roleToCheck.name);
      if (role && role.value) {
        this.user.roles.push({ id: roleToCheck.id });
      } else {
        this.user.roles = this.user.roles.filter(
          (role) => role.id !== roleToCheck.id
        );
      }
    });

    this.userService
      .update(this.user)
      .pipe(
        tap((res) => {
          this.toastService.success('User updated successfully', 'Update User');
          this.dialogRef.close();
          this.reloadCurrentRoute();
        }),
        catchError((err) => {
          this.toastService.error(err.error.error);
          return of(err);
        })
      )
      .subscribe();
  }

  validForm(): boolean {
    return (
      this.firstName.valid &&
      this.lastName.valid &&
      this.phoneNumber.valid &&
      this.email.valid &&
      this.password.valid
    );
  }

  close(ev: any) {
    this.dialogRef.close();
  }

  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
