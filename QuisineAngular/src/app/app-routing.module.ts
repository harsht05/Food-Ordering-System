import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/user/login/login.component';
import { ForgotPasswordComponent } from './modules/user/forgot-password/forgot-password.component';
import { SendVerifyOtpComponent } from './modules/user/send-verify-otp/send-verify-otp.component';
import { RegisterComponent } from './modules/user/register/register.component';

const routes: Routes = [

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
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
