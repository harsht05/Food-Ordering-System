import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/user/login/login.component';
import { ForgotPasswordComponent } from './modules/user/forgot-password/forgot-password.component';
import { SendVerifyOtpComponent } from './modules/user/send-verify-otp/send-verify-otp.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomepageComponent } from './modules/shared/homepage/homepage.component';
import { AllRestaurantsComponent } from './modules/shared/all-restaurants/all-restaurants.component';
import { RegisterComponent } from './modules/user/register/register.component';
import { RestaurantFoodsComponent } from './modules/shared/restaurant-foods/restaurant-foods.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';


const routes: Routes = [

  {
    path: "",
    component: HomepageComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "forgotPassword",
    component: ForgotPasswordComponent
  },
  {
    path: "sendVerifyOtp",
    component: SendVerifyOtpComponent
  },
  {
    path: "restaurants",
    component: AllRestaurantsComponent
  },
  {
    path: "restaurantFoods/:restId",
    component: RestaurantFoodsComponent
  },
  {
    path: "accessDenied",
    component: AccessDeniedComponent
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
    path: 'customers',
    loadChildren: () => import('../app/modules/shared/shared.module').then(m => m.SharedModule)
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
