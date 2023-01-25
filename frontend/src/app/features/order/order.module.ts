import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule, Routes } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

import { OrderCreateComponent } from './components/order-create/order-create.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderUpdateComponent } from './components/order-update/order-update.component';
import { OrderReadComponent } from './components/order-read/order-read.component';

export const routes: Routes = [{ path: '', component: OrderListComponent }];

@NgModule({
  declarations: [
    OrderListComponent,
    OrderCreateComponent,
    OrderUpdateComponent,
    OrderReadComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatExpansionModule,
    MatIconModule,
    NgxPaginationModule,
    MatDialogModule,
    MatMenuModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
  ],
})
export class OrderModule {}
