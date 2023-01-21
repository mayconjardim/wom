import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './shared/components/login/login.component';
import { SidenavComponent } from './shared/components/sidenav/sidenav.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },

  {
    path: '',
    component: SidenavComponent,
    children: [
      {
        path: 'orders',
        loadChildren: () =>
          import('./features/order/order.module').then((m) => m.OrderModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
