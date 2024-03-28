import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantService } from '../../../services/restaurant.service';
import { RestaurantFood } from '../../../models/restaurant-food';

@Component({
  selector: 'app-update-food-items',
  templateUrl: './update-food-items.component.html',
  styleUrls: ['./update-food-items.component.css']
})
export class UpdateFoodItemsComponent implements OnInit {
  restaurantId!: number;
  restaurantFoodId!: number;
  foodForm = new FormGroup({
    rate: new FormControl(0, [Validators.required])
  });

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private restaurantService: RestaurantService
    
  ) { }

  ngOnInit(): void {
    this.restaurantFoodId = parseInt(this.route.snapshot.paramMap.get('foodId')!);
    this.restaurantId = parseInt(this.route.snapshot.paramMap.get('restId')!);
    
    
    this.restaurantService.getRestaurantFoodItem(this.restaurantFoodId).subscribe(response => {
      console.log("jiogdfhgiuvhdfhgfiuhgosg"+response.id);
      
      
      this.foodForm.patchValue({
        rate: response.rate, 
      });      
  
    })
  }

  

  submitForm(): void {
    if (this.foodForm.valid) {
      let updatedRate = this.foodForm.value.rate;
      console.log("jjgjjggjgjgjgjjgjgg"+updatedRate);
      

      this.restaurantService.updateRestaurantFoodRate(this.restaurantFoodId, updatedRate).subscribe(() => {
        console.log('Restaurant food rate updated successfully:');
        
        this.router.navigate(['/restaurant/dashboard', this.restaurantId]);

      }, error => {
        console.error('Error updating restaurant food rate:', error);

      });
      console.log("Restaurant ID:"+this.restaurantId);
      

      this.router.navigate(['/restaurant/dashboard', this.restaurantId]);
    }
  }
}