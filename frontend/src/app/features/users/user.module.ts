import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';

export const routes: Routes = [{ path: '' }];

@NgModule({
  declarations: [
    UserListComponent
  ],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class UserModule {}
