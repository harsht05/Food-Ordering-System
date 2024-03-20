import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { SessionStorageService } from '../../../services/session-storage.service';

@Component({
  selector: 'app-send-otp',
  templateUrl: './send-otp.component.html',
  styleUrl: './send-otp.component.css'
})
export class SendOtpComponent {

  user = new FormGroup(
    {
      "userEmail":new FormControl("",[Validators.required,Validators.pattern('^[a-zA-Z0-9._%+-]+@gmail\.com$')]),
      "agree": new FormControl(Validators.required)
    }
  );

  constructor(private userService: UserService, private sessionStorage: SessionStorageService, private route: Router){}

  otp: number = -1;

  sendOtp() {

    console.log(this.user.value.userEmail);

    this.userService.sendOtp(this.user.value.userEmail!).subscribe(response => {

      // console.log(response);
      this.otp = response;

      if(this.otp != -1) {

        this.sessionStorage.setItem("newUserEmail", this.user.value.userEmail);
        this.route.navigate(['verifyOtp']);
      }
    })
  }
}
