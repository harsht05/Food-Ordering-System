import { Component } from '@angular/core';
import { CustomerService } from '../../../services/customer.service';
import { Restaurant } from '../../../models/restaurant';
import { SessionStorageService } from '../../../services/session-storage.service';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrl: './customer-dashboard.component.css'
})
export class CustomerDashboardComponent {

  constructor(private custService:CustomerService, private userService: UserService, private storageService: SessionStorageService, private router: Router) {

  }

  restaurants:Restaurant[] = [];
  customerId: number = 0;

  ngOnInit() {

    // const cid = sessionStorage.getItem("custId");

    // if (cid === null) {
      
    //   this.router.navigate(['/accessDenied']); // Assuming 'access-denied' is the route for the AccessDenied component
    // } 
    // else {
      
    //   this.customerId = Number(cid);
      
    //   this.restService.getAllRestaurants().subscribe(response => {
    //     this.restaurants = response;
    //     console.log(this.restaurants);
    //   });
    // }

    this.userService.getAllRestaurants().subscribe(response => {
      this.restaurants = response;
      console.log(this.restaurants);
    });
  }
}
