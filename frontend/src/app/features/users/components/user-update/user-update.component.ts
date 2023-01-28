import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, of, tap } from 'rxjs';

import { User } from '../../models/user';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'ser-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss'],
})
export class UserUpdateComponent {
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
    this.user.id = this.data.id;
    this.findByUpdateId();
  }

  findByUpdateId() {
    this.userService.findById(this.user.id).subscribe(
      (resp) => {
        this.user = resp;
      },
      (ex) => {
        this.toastService.error(ex.error.error);
      }
    );
  }

  updateOrder() {
    if (this.roles.get('admin')!.value == true) {
      this.user.roles.push({ id: 1 });
    }

    if (this.roles.get('manager')!.value == true) {
      this.user.roles.push({ id: 2 });
    }

    if (this.roles.get('yard')!.value == true) {
      this.user.roles.push({ id: 3 });
    }

    this.userService
      .update(this.user)
      .pipe(
        tap((res) => {
          this.toastService.success('User created successfully', 'New User');
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
