import { Component } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { Feedback } from '../../../models/feedback';
import { SessionStorageService } from '../../../services/session-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-all-feedback',
  templateUrl: './view-all-feedback.component.html',
  styleUrl: './view-all-feedback.component.css'
})
export class ViewAllFeedbackComponent {

  constructor(private adminService:AdminService, private sessionStorageService: SessionStorageService, private route: Router){

  }

  feedback:Feedback[] = [];

  ngOnInit() {

    if(!this.sessionStorageService.getItem("isAdmin")) {

      this.route.navigate(['accessDenied']);
    }

    this.adminService.getAllFeedbacks().subscribe(response => {
      this.feedback = response;
      console.log(this.feedback);
    });
}
}
