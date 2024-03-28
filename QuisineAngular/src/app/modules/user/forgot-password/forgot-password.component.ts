import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { SessionStorageService } from '../../../services/session-storage.service';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../models/user';
import { response } from 'express';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  user = new FormGroup(
    {
      "userEmail":new FormControl("",[Validators.required,Validators.pattern('^[a-zA-Z0-9._%+-]+@gmail\.com$')]),
      "agree": new FormControl(Validators.required)
    }
  );

  otpForm = new FormGroup({
    "otp": new FormControl('', [Validators.required, Validators.pattern('[0-9]{6}$')])
  });

  changePassword = new FormGroup(
    {
      "userPass":new FormControl("",[Validators.required,Validators.pattern('^[a-zA-Z0-9._%+-]+@gmail\.com$')]),
      "confirmPassword": new FormControl("", [Validators.required]),
    }
  );

  passwordMatchValidator(control: AbstractControl): { [key: string]: any } | null {
    const password = control.get('userPass');
    const confirmPassword = control.get('confirmPassword');

    if (!password || !confirmPassword) {
      return null;
    }

    if (password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      confirmPassword.setErrors(null); 
      return null;
    }
  }

  constructor(private userService: UserService, private sessionStorage: SessionStorageService, private router: Router, private route: ActivatedRoute){}

  otp: number = -1;
  otpStatus: boolean = false;
  entity: string | null = '';
  verifyOtpStatus: boolean = false;

  ngOnInit() {

    this.entity = this.route.snapshot.paramMap.get("entity");
  }

  sendOtp() {

    console.log(this.user.value.userEmail);

    this.userService.getUserByEmail(this.user.value.userEmail!).subscribe(response => {

      if(response !== null) {

        this.userService.sendOtp(this.user.value.userEmail!).subscribe(response => {

          this.otp = response;
    
          if(this.otp != -1) {
    
            this.sessionStorage.setItem("newUserEmail", this.user.value.userEmail);
            console.log(this.otpStatus);
            this.otpStatus = true;
          }
        });
      }

      else {
        Swal.fire(
          'User Not Exists!!',
          '',
          'error'
        );
      }
    });

    
  }

  verifyOtp() {

    const otp = this.otpForm.value.otp;
    console.log(otp);
    if(otp !== null) {

      this.userService.verifyOtp(Number(otp)).subscribe(response => {

        console.log(response);
        if(response) {
          this.verifyOtpStatus = true;
        }

        else {

          this.otpForm.patchValue({
            otp: ''
          });

          Swal.fire(
            'Wrong OTP Entered!!',
            '',
            'error'
          );

        }
      });
    }
  }

  updatePassword() {

    this.userService.changePassword(new User(0, '', this.user.value.userEmail!, this.changePassword.value.userPass!, '', '', '', '', '', '', 0, '')).subscribe(response => {
      console.log(response);

      if(response !== null) {

        Swal.fire(
          'Password Updated Successfully!!',
          '',
          'success'
        );
        this.router.navigate(['login']);
      }
    })
  }

  
}
