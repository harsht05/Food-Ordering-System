import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../../services/customer.service';

@Component({
  selector: 'app-delete-order',
  templateUrl: './delete-order.component.html',
  styleUrl: './delete-order.component.css'
})
export class DeleteOrderComponent {

  constructor(private router: Router, private route: ActivatedRoute, private custService: CustomerService) {

  }

  isOrderDeleted:boolean = false;

  ngOnInit() {

    const orderId = Number(this.route.snapshot.paramMap.get("orderId"));

    this.custService.cancelOrder(orderId).subscribe(response => {

      if(response) {
        
        console.log('Order Cancelled');
        this.router.navigate(['/customer/viewOrders']);
        this.isOrderDeleted = true;
      }
  
      else {
        console.log('Failed To Cancelled Order');
      }
    });
  }
}
