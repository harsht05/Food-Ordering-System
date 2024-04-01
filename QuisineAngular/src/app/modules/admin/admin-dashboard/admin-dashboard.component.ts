import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Feedback } from '../../../models/feedback';
import { AdminService } from '../../../services/admin.service';
import { FeedbackService } from '../../../services/feedback.service';
import { SessionStorageService } from '../../../services/session-storage.service';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl:'./admin-dashboard.component.css',
})
export class AdminDashboardComponent {
  constructor(private route:Router,private adminService:AdminService,private feedbackService :FeedbackService, private sessionStorageService: SessionStorageService) {}


  feedbacks:Feedback[]=[];

  countsByExperience: any[] = [];



  adminLogout(){

    this.sessionStorageService.clearStorage();
    this.route.navigate(['']);
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

  ngOnInit() {

    if(!this.sessionStorageService.getItem("isAdmin")) {

      this.route.navigate(['accessDenied']);
    }

    this.adminService.getOrdersByDate().subscribe(response => {
      this.countsByExperience=response;
      console.log(this.countsByExperience+"ORDERSSSSSS");
    });
  }
}