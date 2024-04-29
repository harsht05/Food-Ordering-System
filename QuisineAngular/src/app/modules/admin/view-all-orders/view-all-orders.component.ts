import { Component } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { Orders } from '../../../models/orders';
import { SessionStorageService } from '../../../services/session-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-all-orders',
  templateUrl: './view-all-orders.component.html',
  styleUrl: './view-all-orders.component.css'
})
export class ViewAllOrdersComponent {

  constructor( private adminService:AdminService, private sessionStorageService: SessionStorageService, private route: Router) {

  }
  resStartIdx = 0;
  resEndIdx = 9; 
  totalRes = 0;
  allOrders: Orders[] = [];
  currOrders:Orders[]=[];

  ngOnInit() {

    if(!this.sessionStorageService.getItem("isAdmin")) {

      this.route.navigate(['accessDenied']);
    }

    this.adminService.getAllOrders().subscribe(response => {
      
      this.allOrders = response;
      this.allOrders.reverse();
      this.totalRes = this.allOrders.length;
      this.loadOrders();
      
    });
  }
  prev() {
    if (this.resStartIdx > 0) {
      this.resEndIdx = this.resStartIdx - 1;
      this.resStartIdx -= 10;
      this.loadOrders();
    }
  }

  next() {
    if (this.resEndIdx + 10 < this.totalRes) {
      this.resStartIdx = this.resEndIdx + 1;
      this.resEndIdx += 10;
    } else if (this.resEndIdx < this.totalRes) {
      this.resStartIdx = this.resEndIdx + 1;
      this.resEndIdx = this.totalRes - 1;
    }
    this.loadOrders();
  }

  loadOrders() {
    if (this.resStartIdx >= 0 && this.resEndIdx < this.totalRes && this.resStartIdx <= this.resEndIdx) {
      this.currOrders = this.allOrders.slice(this.resStartIdx, this.resEndIdx + 1);
    } else {
      console.error('Invalid index range or indices.');
    }
  }
}
