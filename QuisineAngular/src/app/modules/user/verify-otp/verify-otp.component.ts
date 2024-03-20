import { Component } from '@angular/core';
import { SessionStorageService } from '../../../services/session-storage.service';
import { UserService } from '../../../services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrl: './verify-otp.component.css'
})
export class VerifyOtpComponent {

  constructor(private sessionStorage: SessionStorageService, private userService: UserService, private route: Router) {}
  email:String='';

  user = new FormGroup(
    {
      "otp": new FormControl('', [Validators.required, Validators.pattern('[0-9]{6}$')
    ])
    }
  );

  ngOnInit() {

    this.email = this.sessionStorage.getItem("newUserEmail");
  }

  verifyOtp() {

    const otp = this.user.value.otp;

    if(otp !== null) {

      this.userService.verifyOtp(Number(otp)).subscribe(response => {

        console.log(response);
        if(response) {

          this.route.navigate(['register'])
        }
      });
    }
  }
}
