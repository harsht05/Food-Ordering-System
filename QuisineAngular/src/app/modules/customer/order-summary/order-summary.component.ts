import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from '../../../services/session-storage.service';
import { RestaurantFood } from '../../../models/restaurant-food';
import { Orders } from '../../../models/orders';
import { CustomerService } from '../../../services/customer.service';
import { UserService } from '../../../services/user.service';
import { Restaurant } from '../../../models/restaurant';
import { Customer } from '../../../models/customer';

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
    private userService: UserService
  ) {}

  map: Map<RestaurantFood, number> = new Map();
  customerId: number = 6;
  restaurantId: number = 0;
  restaurant: Restaurant = new Restaurant();
  customer: Customer = new Customer();
  orders: Orders[] = [];

  ngOnInit() {
    const storedMap = this.sessionStorageService.getMap("mealsMap");

    this.restaurantId = this.sessionStorage.getItem("restId");

    if (storedMap !== null) {
      this.map = storedMap;
    }

    this.userService.getRestaurantById(this.restaurantId).subscribe({
      next: (response) => {
        this.restaurant = response;

        this.userService.getCustomerById(this.customerId).subscribe({
          next: (custResponse) => {
            this.customer = custResponse;
            
            this.processOrders();
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
    for (const [restaurantFood, quantity] of this.map.entries()) {
      const order = new Orders(
        0,
        quantity,
        quantity * restaurantFood.rate,
        new Date(),
        restaurantFood.food,
        this.customer,
        this.restaurant
      );
      this.custService.addCustomerOrder(order).subscribe(response => {
        this.orders.push(response);
      });
    }
  }
}
