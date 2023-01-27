import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from '../../models/user';
import { ToastrService } from 'ngx-toastr';
import { Route, Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss'],
})
export class UserCreateComponent implements OnInit {
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
    private userService: UserService,
    public dialogRef: MatDialogRef<UserCreateComponent>,
    private formBuilder: FormBuilder,
    private toastService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  createOrder() {
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
      .create(this.user)
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
