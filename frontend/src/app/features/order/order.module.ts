import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule, Routes } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

import { OrderListComponent } from './components/order-list/order-list.component';

export const routes: Routes = [{ path: '', component: OrderListComponent }];

@NgModule({
  declarations: [OrderListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatExpansionModule,
    MatIconModule,
    NgxPaginationModule,
    MatDialogModule,
    MatMenuModule,
    MatButtonModule,
  ],
})
export class OrderModule {}
