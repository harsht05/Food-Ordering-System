import { Component } from '@angular/core';
import { RestaurantService } from '../../../services/restaurant.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Orders } from '../../../models/orders';
import { SessionStorageService } from '../../../services/session-storage.service';

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
    private router: Router,
    private sessionStorageService:SessionStorageService) { }
  ngOnInit(): void {
    this.restaurantId = this.route.snapshot.paramMap.get("restId")
    this.getRestaurantOrders(this.restaurantId); 
  }
  getRestaurantOrders(restaurantId: number): void {
    this.restaurantService.getRestaurantOrders(this.restaurantId).subscribe(response => {

      response.forEach(element => {
        element.isCollapsed = true;
      });

      this.restaurantOrders = response;
      console.log(this.restaurantOrders);
      
      
    });
  }

  toggleCollapse(item: Orders): void {
    item.isCollapsed = !item.isCollapsed;
  }
  logout() {

    this.sessionStorageService.clearStorage();
    this.router.navigate(['']);

  }

}
