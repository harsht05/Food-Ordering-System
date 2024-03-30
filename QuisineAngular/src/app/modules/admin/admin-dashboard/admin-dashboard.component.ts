import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl:'./admin-dashboard.component.css',
})
export class AdminDashboardComponent {
  constructor(private route:Router) {}

  adminLogout(){
    this.route.navigate(['/logout']);
  }
  ViewAllRestaurant(){
    this.route.navigate(['/viewRestaurants'])
  }
  ViewAllCustomer(){
    this.route.navigate(['/viewCustomers'])
  }
  ViewAllOrder(){
    this.route.navigate(['/viewOrders'])
  }
  ViewAllFeedback(){
    this.route.navigate(['/viewFeedback'])
  }
}
