import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { Feedback } from '../../../models/feedback';
import { SessionStorageService } from '../../../services/session-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-all-feedback',
  templateUrl: './view-all-feedback.component.html',
  styleUrls: ['./view-all-feedback.component.css']
})
export class ViewAllFeedbackComponent implements OnInit {

  constructor(private adminService: AdminService, private sessionStorageService: SessionStorageService, private route: Router) { }

  resStartIdx = 0;
  resEndIdx = 7; 
  totalRes = 0;
  feedback: Feedback[] = [];
  currFeedback: Feedback[] = [];

  ngOnInit() {
    if (!this.sessionStorageService.getItem("isAdmin")) {
      this.route.navigate(['accessDenied']);
    }

    this.adminService.getAllFeedbacks().subscribe(response => {
      this.feedback = response;
      this.totalRes = this.feedback.length;
      this.loadFeedbacks();
    });
  }

  prev() {
    if (this.resStartIdx > 0) {
      this.resEndIdx = this.resStartIdx - 1;
      this.resStartIdx -= 8;
      this.loadFeedbacks();
    }
  }

  next() {
    if (this.resEndIdx + 8 < this.totalRes) {
      this.resStartIdx = this.resEndIdx + 1;
      this.resEndIdx += 8;
    } else if (this.resEndIdx < this.totalRes) {
      this.resStartIdx = this.resEndIdx + 1;
      this.resEndIdx = this.totalRes - 1;
    }
    this.loadFeedbacks();
  }

  loadFeedbacks() {
    if (this.resStartIdx >= 0 && this.resEndIdx < this.totalRes && this.resStartIdx <= this.resEndIdx) {
      this.currFeedback = this.feedback.slice(this.resStartIdx, this.resEndIdx + 1);
    } else {
      console.error('Invalid index range or indices.');
    }
  }
}
