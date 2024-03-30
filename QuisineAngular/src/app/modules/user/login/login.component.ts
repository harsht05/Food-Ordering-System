import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SessionStorageService } from '../../../services/session-storage.service';
import { User } from '../../../models/user';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private service: UserService, private sessionStorage: SessionStorageService, private route: Router) {

  }
  user = new FormGroup(
    {
      "userEmail":new FormControl("",[Validators.required,Validators.pattern('^[a-zA-Z0-9._%+-]+@gmail\.com$')]),
      "userPass": new FormControl("", [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/)]),
      "agree": new FormControl([Validators.required])
    }
  );

  login() {

    this.service.login(new User(0, '', this.user.value.userEmail!, this.user.value.userPass!, '', '', '', '', '', '', 0, '')).subscribe(response => {

      console.log(response);

      if(response !== null) {
        
        if(response.role === "customer") {

          console.log(response);
          this.sessionStorage.setItem("custId", response.userId);
          this.sessionStorage.setItem("custAddress", response.userAddress);
          
          if(this.sessionStorage.getMap("mealsMap") !== null) {

            this.route.navigate(['customer/payementGateway']);
            Swal.fire(
              'Login Successfully!!',
              '',
              'success'
            );
          }

          else if(this.sessionStorage.getItem("restId") !== null) {

            this.route.navigate([`customer/addToCart/${this.sessionStorage.getItem("restId")}`]);
            Swal.fire(
              'Login Successfully!!',
              '',
              'success'
            );
          }

          else {

            // window.history.go(-1);
            this.route.navigate(['restaurants']);
            Swal.fire(
              'Login Successfully!!',
              '',
              'success'
            );
          }
        }

        if(response.role === 'restaurant') {

          this.sessionStorage.setItem("restaurantId", response.userId);
          this.route.navigate([`restaurant/dashboard/${response.userId}`]);
            Swal.fire(
              'Login Successfully!!',
              '',
              'success'
            );
        }
        
      }

      else {

        Swal.fire(
          'Wrong Credentials Entered!!',
          'Please enter valid credentials....',
          'error'
        );
      }
      
    });
  }
  
  
  
}
