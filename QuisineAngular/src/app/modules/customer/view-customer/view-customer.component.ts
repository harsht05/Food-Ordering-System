import { Component } from '@angular/core';
import { SessionStorageService } from '../../../services/session-storage.service';
import { UserService } from '../../../services/user.service';
import { Customer } from '../../../models/customer';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrl: './view-customer.component.css'
})
export class ViewCustomerComponent {

  customerId: number = 6;
  customer: Customer = new Customer();
  
  user = new FormGroup({
    userName: new FormControl(''),
    userEmail: new FormControl(''),
    userContact: new FormControl(''),
    userPass: new FormControl(''),
    userCity: new FormControl(''),
    userState: new FormControl(''),
    userPin: new FormControl(0),
  });

  constructor(private sessionStorage: SessionStorageService, private userService: UserService) {}

  ngOnInit() {

    const cid = this.sessionStorage.getItem("custId");

    if(cid !== null) {

      this.customerId = cid;
    }

    this.userService.getCustomerById(this.customerId).subscribe(response => {

      this.customer = response;

      this.user.patchValue({
        userName: this.customer.userName,
        userEmail: this.customer.userEmail,
        userContact: this.customer.userContact,
        userPass: this.customer.userPass,
        userCity: this.customer.userCity,
        userState: this.customer.userState,
        userPin: this.customer.userPin,
      });
    });
  }
}
