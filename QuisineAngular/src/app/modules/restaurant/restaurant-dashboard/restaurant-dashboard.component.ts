import { Component } from '@angular/core';
import { RestaurantService } from '../../../services/restaurant.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-restaurant-dashboard',
  templateUrl: './restaurant-dashboard.component.html',
  styleUrl: './restaurant-dashboard.component.css'
})
export class RestaurantDashboardComponent {

  restaurant: any;
  restaurantId:any;

  constructor(private restaurantService: RestaurantService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.restaurantId=this.route.snapshot.paramMap.get("restId")
    this.getRestaurantById(this.restaurantId); 
    
    
  }

  getRestaurantById(id: number): void {
    this.restaurantService.getRestaurantById(id).subscribe(
      (data) => {
        console.log(data);
        
        
        this.restaurant = data;
      },
      (error) => {
        console.error('Error fetching restaurant:', error);
      }
    );
  }

  

}
