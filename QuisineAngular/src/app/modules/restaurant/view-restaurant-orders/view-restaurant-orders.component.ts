import { Component } from '@angular/core';
import { RestaurantService } from '../../../services/restaurant.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Orders } from '../../../models/orders';

@Component({
  selector: 'app-view-restaurant-orders',
  templateUrl: './view-restaurant-orders.component.html',
  styleUrl: './view-restaurant-orders.component.css'
})
export class ViewRestaurantOrdersComponent {
  restaurantId: any;
  restaurantOrders: Orders[] = [];

  constructor(private restaurantService: RestaurantService,
    private route: ActivatedRoute,
    private router: Router) { }
  ngOnInit(): void {
    this.restaurantId = this.route.snapshot.paramMap.get("restId")
    this.getRestaurantOrders(this.restaurantId); 
  }
  getRestaurantOrders(restaurantId: number): void {
    this.restaurantService.getRestaurantOrders(restaurantId).subscribe(
      (orders: Orders[]) => {
        this.restaurantOrders = orders; 
      },
      (error) => {
        console.error('Error fetching restaurant orders:', error);
      }
    );
  }
  

}
