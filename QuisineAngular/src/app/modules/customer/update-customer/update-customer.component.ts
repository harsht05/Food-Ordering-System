import { Component } from '@angular/core';
import { Customer } from '../../../models/customer';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SessionStorageService } from '../../../services/session-storage.service';
import { CustomerService } from '../../../services/customer.service';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrl: './update-customer.component.css'
})
export class UpdateCustomerComponent {

  customerId: number = 0;
  customer: Customer = new Customer();
  
  user = new FormGroup({
    userName: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z]{3,}$/)]),
    userEmail: new FormControl(''),
    userContact: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.maxLength(10), Validators.minLength(10)]),
    userPass: new FormControl(''),
    userAddress: new FormControl(''),
    userCity: new FormControl(''),
    userState: new FormControl(''),
    userPin: new FormControl(0)
  });

  constructor(private sessionStorage: SessionStorageService, private custService: CustomerService, private userService: UserService, private route: Router) {}

  ngOnInit() {

    const cid = this.sessionStorage.getItem("custId");

    if(cid === null) {

      this.route.navigate(['login']);
    }

    else {

      this.customerId = cid;
    }

    this.userService.getCustomerById(this.customerId).subscribe(response => {

      this.customer = response;

      this.user.patchValue({
        userName: this.customer.userName,
        userEmail: this.customer.userEmail,
        userContact: this.customer.userContact,
        userPass: this.customer.userPass,
        userAddress: this.customer.userAddress,
        userCity: this.customer.userCity,
        userState: this.customer.userState,
        userPin: this.customer.userPin
      });
    });
  }

  updateCustomer() {
      
    this.custService.updateCustomer(new Customer(this.customerId, this.user.value.userName!, this.user.value.userEmail!, this.user.value.userPass!, '', this.user.value.userContact!, this.user.value.userAddress!, this.user.value.userCity!, this.user.value.userState!, this.user.value.userPin!, "customer")).subscribe(response => {

      this.route.navigate(['/customer/viewCustomer']);
    });
  }
}
