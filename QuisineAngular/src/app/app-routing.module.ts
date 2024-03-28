import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './modules/user/login/login.component';
import { SendOtpComponent } from './modules/user/send-otp/send-otp.component';
import { VerifyOtpComponent } from './modules/user/verify-otp/verify-otp.component';
import { RegisterComponent } from './modules/user/register/register.component';

const routes: Routes = [
  {
    path:"login",
    component: LoginComponent
  },
  {
    path:"sendOtp",
    component: SendOtpComponent
  },
  {
    path:"verifyOtp",
    component: VerifyOtpComponent
  },
  {
    path:"register",
    component: RegisterComponent
  },
  {
    path: 'customer',
    loadChildren: () => import('../app/modules/customer/customer.module').then(m => m.CustomerModule)
  },
  {
    path: 'restaurant',
    loadChildren: () => import('../app/modules/restaurant/restaurant.module').then(m => m.RestaurantModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('../app/modules/admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
