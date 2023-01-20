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
    email: '',
    password: '',
  };

  email = new FormControl(null, Validators.email);
  password = new FormControl(null, Validators.minLength(5));

  validForm(): boolean {
    if (this.email.valid && this.password.valid) {
      return true;
    }
    return false;
  }
}
