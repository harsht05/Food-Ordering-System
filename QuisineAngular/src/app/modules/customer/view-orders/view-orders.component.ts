import { Component } from '@angular/core';
import { SessionStorageService } from '../../../services/session-storage.service';
import { Orders } from '../../../models/orders';
import { CustomerService } from '../../../services/customer.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrl: './view-orders.component.css'
})
export class ViewOrdersComponent {

  constructor(private sessionStorage: SessionStorageService, private custService: CustomerService, private route: Router) {

  }

  orders: Orders[] = [];
  customerId: number = 0;
  
  currOrders: Orders[] = [];

  resStartIdx = 0;
  resEndIdx = 0;
  totalRes = 0;

  prev() {

    if(this.resStartIdx > 0) {

      this.resEndIdx = this.resStartIdx - 1;
      this.resStartIdx -= 10;
      
      this.loadOrders();
    }
    
    
  }

  next() {

    if(this.resEndIdx + 10 < this.totalRes) {

      this.resStartIdx = this.resEndIdx + 1;
      this.resEndIdx += 10;
    }

    else if(this.resEndIdx < this.totalRes) {

      this.resStartIdx = this.resEndIdx + 1;
      this.resEndIdx = this.totalRes - 1;
    }

    this.loadOrders();
  }

  loadOrders() {
    
    if (this.resStartIdx >= 0 && this.resEndIdx < this.orders.length && this.resStartIdx <= this.resEndIdx) {
      
      this.currOrders = this.orders.slice(this.resStartIdx, this.resEndIdx + 1);
    } 
    else {
      
      console.error('Invalid index range or indices.');
    }
  }

  ngOnInit() {

    const cid = this.sessionStorage.getItem("custId");
    console.log("ghfdgfggfuewigfeiucustomerid"+cid);
    
    if(cid === null) {

      this.route.navigate(['']);
    }

    else {

      this.customerId = cid;
    }

    this.custService.getCustomerOrders(this.customerId).subscribe(response => {

      response.forEach(element => {
        element.isCollapsed = true;
      });

      this.orders = response;

      this.totalRes = this.orders.length;

      if(this.totalRes > 10) {

        this.resEndIdx = 9;
      }

      this.loadOrders();
    });

    
  }

  isOrderCancellable(orderDate: Date): boolean {
    const currentDate = new Date();
    const differenceInMinutes = (currentDate.getTime() - new Date(orderDate).getTime()) / (1000 * 60);
    return differenceInMinutes < 10;
  }

  cancelOrder(orderId: number): void {

    Swal.fire({
      title: 'Are you sure want to cancel your order?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Cancel my order!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Your Order has been Cancelled Successfully!',
          'Your Amount will be credited into your account within 24 hours',
          'success'
        )
        this.route.navigate([`/customer/deleteOrder/${orderId}`]);
      } 
    });
  }

  toggleCollapse(item: Orders): void {
    item.isCollapsed = !item.isCollapsed;
  }
}