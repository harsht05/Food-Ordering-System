import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from '../../../services/session-storage.service';
import { RestaurantFood } from '../../../models/restaurant-food';
import { Orders } from '../../../models/orders';
import { CustomerService } from '../../../services/customer.service';
import { UserService } from '../../../services/user.service';
import { Restaurant } from '../../../models/restaurant';
import { Customer } from '../../../models/customer';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { tap } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.css'
})
export class OrderSummaryComponent {

  constructor(
    private sessionStorageService: SessionStorageService,
    private custService: CustomerService,
    private sessionStorage: SessionStorageService,
    private userService: UserService,
    private route: Router
  ) {}

  map: Map<RestaurantFood, number> = new Map();
  customerId: number = 0;
  restaurantId: number = 0;
  restaurant: Restaurant = new Restaurant();
  customer: Customer = new Customer();
  orders: Orders[] = [];
  delAddress:string ='';

  ngOnInit() {

    const storedMap = this.sessionStorageService.getMap("mealsMap");

    this.restaurantId = this.sessionStorage.getItem("restId");
    const cid = this.sessionStorage.getItem("custId");

    if(cid === null) {

      this.route.navigate(['']);
    }

    else {

      this.customerId = cid;
      this.delAddress = this.sessionStorage.getItem("delAddress");
    }

    if (storedMap !== null) {
      this.map = storedMap;
    }

    this.userService.getRestaurantById(this.restaurantId).subscribe({
      next: (response) => {
        this.restaurant = response;

        this.userService.getCustomerById(this.customerId).subscribe({
          next: (custResponse) => {
            this.customer = custResponse;
            
            this.processOrders().subscribe(() => {
              console.log("send email");
              console.log(this.orders);
      
              this.custService.sendOrderDetails(this.orders).subscribe(response => {
                console.log(response);

                
              Swal.fire(
                'Congratulations! Your Order has been placed Successfully....',
                '',
                'success'
              );
              });
            });
          },

          error: (error) => {
        
            console.error('Failed to get customer:', error);
          }
        })
      },
      error: (error) => {
        
        console.error('Failed to get restaurant:', error);
      }
    });
  }

  processOrders() {
    const observables = [];
    for (const [restaurantFood, quantity] of this.map.entries()) {
      const order = new Orders(
        0,
        quantity,
        quantity * restaurantFood.rate,
        new Date(),
        this.delAddress,
        restaurantFood.food,
        this.customer,
        this.restaurant,
        true
      );

      const observable = this.custService.addCustomerOrder(order);
      observables.push(observable);
    }
    return forkJoin(observables).pipe(
      tap((responses: Orders[]) => {
        responses.forEach(response => {
          response.isCollapsed = true;
          this.orders.push(response);
        });
      })
    );
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
    })
  }

  toggleCollapse(item: Orders): void {
    item.isCollapsed = !item.isCollapsed;
  }
}
