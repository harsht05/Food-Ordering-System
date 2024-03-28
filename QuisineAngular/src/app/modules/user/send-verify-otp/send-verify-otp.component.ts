import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { SessionStorageService } from '../../../services/session-storage.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-send-verify-otp',
  templateUrl: './send-verify-otp.component.html',
  styleUrl: './send-verify-otp.component.css'
})
export class SendVerifyOtpComponent {

  user = new FormGroup(
    {
      "userEmail":new FormControl("",[Validators.required,Validators.pattern('^[a-zA-Z0-9._%+-]+@gmail\.com$')]),
      "agree": new FormControl(Validators.required)
    }
  );

  otpForm = new FormGroup({
    "otp": new FormControl('', [Validators.required, Validators.pattern('[0-9]{6}$')])
  });

  constructor(private userService: UserService, private sessionStorage: SessionStorageService, private router: Router){}

  otp: number = -1;
  otpStatus: boolean = false;

  sendOtp() {

    console.log(this.user.value.userEmail);

    this.userService.getUserByEmail(this.user.value.userEmail!).subscribe(response => {

      if(response === null) {

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
          'User Already Exists!',
          '',
          'error'
        )
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

          this.router.navigate(['register'])
          
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

  
}
