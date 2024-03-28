import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SendOtpComponent } from './send-otp/send-otp.component';
import { VerifyOtpComponent } from './verify-otp/verify-otp.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    SendOtpComponent,
    VerifyOtpComponent,
  ],
    imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    
  ],
  exports:[
    LoginComponent,
    RegisterComponent,
    SendOtpComponent,
    VerifyOtpComponent
  ]
})
export class UserModule { }
