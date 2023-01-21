import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { Credentials } from '../../models/credentials';

@Component({
  selector: 'login',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  creds: Credentials = {
    username: '',
    password: '',
  };

  username = new FormControl(null, Validators.email);
  password = new FormControl(null, Validators.minLength(5));

  constructor(
    private toast: ToastrService,
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
    this.authService.authenticate(this.creds).subscribe(
      (response: any) => {
        this.authService.successfulLogin(response['access_token']);
        this.toast.success('Logged in successfully!', 'Login');
        this.router.navigate(['']);
      },
      () => {
        this.toast.error('Email or password invalid!', 'Error');
      }
    );
  }

  validForm(): boolean {
    return this.username.valid && this.password.valid;
  }
}
