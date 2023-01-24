import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidenavComponent } from './shared/components/sidenav/sidenav.component';
import { AuthInterceptorProvider } from './core/interceptors/auth.interceptor';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';

@NgModule({
  declarations: [AppComponent],
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { disableClose: true } },
    AuthInterceptorProvider,
  ],

  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SidenavComponent,
    ToastrModule.forRoot({
      timeOut: 3000,
      closeButton: true,
      progressBar: true,
    }),
  ],
})
export class AppModule {}
