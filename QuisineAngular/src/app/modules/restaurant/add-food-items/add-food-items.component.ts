import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantService } from '../../../services/restaurant.service';
import { RestaurantFood } from '../../../models/restaurant-food';

@Component({
  selector: 'app-add-food-items',
  templateUrl: './add-food-items.component.html',
  styleUrls: ['./add-food-items.component.css']
})
export class AddFoodItemsComponent implements OnInit {
  restaurantId: any;
  foodForm!: FormGroup;
  restaurant:any;

  constructor(
    private restaurantService: RestaurantService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.restaurantId = this.route.snapshot.paramMap.get("restId");
    this.getRestaurantById(this.restaurantId);
    this.initForm();
  }

  initForm(): void {
    this.foodForm = this.formBuilder.group({
      foodName: ['', Validators.required],
      rate: ['', Validators.required],
      foodImage: ['', Validators.required]
    });
  }

  submitForm(): void {
    if (this.foodForm.valid) {
      const foodData = this.foodForm.value;
      const restaurantFood: RestaurantFood = new RestaurantFood(
        0,
        { foodId: 0, foodName: foodData.foodName, foodImage: foodData.foodImage.substring(12) },
        foodData.rate,
        this.restaurant
      );

      this.restaurantService.addFoodItem(restaurantFood).subscribe(
        () => {
          this.router.navigate(['/restaurant/dashboard', this.restaurantId]);
        },
        (error) => {
          this.router.navigate(['/restaurant/dashboard', this.restaurantId]);
          console.error('Error adding food item:', error);
        }
      );
    }
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
}
