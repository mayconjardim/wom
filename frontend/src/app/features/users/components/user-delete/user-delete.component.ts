import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.scss'],
})
export class UserDeleteComponent implements OnInit {
  user: User = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    roles: [],
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private userService: UserService,
    public dialogRef: MatDialogRef<UserDeleteComponent>,
    private toastService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user.id = this.data.id;
    this.findUserById();
  }

  findUserById() {
    this.userService.findById(this.data.id).subscribe(
      (resp) => {
        this.user = resp;
      },
      (ex) => {
        this.toastService.error(ex.error.error);
      }
    );
  }

  deleteUser(ev: any) {
    this.userService
      .delete(this.user.id)
      .pipe(
        tap((res) => {
          this.toastService.success('User deleted successfully', 'Delete User');
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
