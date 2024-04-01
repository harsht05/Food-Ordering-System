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

  allOrders: Orders[] = [];

  ngOnInit() {

    if(!this.sessionStorageService.getItem("isAdmin")) {

      this.route.navigate(['accessDenied']);
    }

    this.adminService.getAllOrders().subscribe(response => {
      
      this.allOrders = response;
      console.log(this.allOrders);
      
    });
  }
}
