import { Component } from '@angular/core';
import { SessionStorageService } from '../../../services/session-storage.service';
import { Orders } from '../../../models/orders';
import { CustomerService } from '../../../services/customer.service';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrl: './view-orders.component.css'
})
export class ViewOrdersComponent {

  constructor(private sessionStorage: SessionStorageService, private custService: CustomerService) {

  }

  orders: Orders[] = [];
  customerId: number = 6;

  ngOnInit() {

    const cid = this.sessionStorage.getItem("custId");

    if(cid != null) {

      this.customerId = cid;
    }

    this.custService.getCustomerOrders(this.customerId).subscribe(response => {

      this.orders = response;
    });
  }
}
