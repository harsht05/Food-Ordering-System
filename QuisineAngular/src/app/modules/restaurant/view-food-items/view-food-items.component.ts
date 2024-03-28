import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantService } from '../../../services/restaurant.service';

@Component({
  selector: 'app-view-food-items',
  templateUrl: './view-food-items.component.html',
  styleUrl: './view-food-items.component.css'
})
export class ViewFoodItemsComponent {

  restaurant: any;
  restaurantId: any;
  foods: any[] = [];
  constructor(private restaurantService: RestaurantService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.restaurantId = this.route.snapshot.paramMap.get("restId")
    this.getRestaurantById(this.restaurantId); 
    this.getFoodsByRestaurantId(this.restaurantId);
  }

  getRestaurantById(id: number): void {
    this.restaurantService.getRestaurantById(id).subscribe(
      (data) => {
        this.restaurant = data;
      },
      (error) => {
        console.error('Error fetching restaurant:', error);
      }
    );
  }

  getFoodsByRestaurantId(id: number): void {
    this.restaurantService.getRestaurantFoodById(id).subscribe(
      (data) => {
        this.foods = data;
      },
      (error) => {
        console.error('Error fetching foods:', error);
      }
    );
  }

  deleteFoodItem(foodId: number): void {
    if (confirm('Are you sure you want to delete this food item?')) {
      this.restaurantService.deleteFoodItem(foodId).subscribe(
        () => {
          this.foods = this.foods.filter(food => food.id !== foodId);
        },
        (error) => {
          console.error('Error deleting food item:', error);
        }
      );
    }
  }
  updateFoodItem( foodId: number): void {
    this.router.navigate(['/restaurant/updateFoodItems', foodId,this.restaurantId]); // Navigate to update-food component with foodId as parameter
  }


  

}
