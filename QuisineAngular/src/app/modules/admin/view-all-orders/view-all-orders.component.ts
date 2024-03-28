import { Component } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { Orders } from '../../../models/orders';

@Component({
  selector: 'app-view-all-orders',
  templateUrl: './view-all-orders.component.html',
  styleUrl: './view-all-orders.component.css'
})
export class ViewAllOrdersComponent {

  constructor( private adminService:AdminService) {

  }

  allOrders: Orders[] = [];

  ngOnInit() {
    this.adminService.getAllOrders().subscribe(response => {
      this.allOrders = response;
    });
  }
}
