import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantService } from '../../../services/restaurant.service';
import Swal from 'sweetalert2';
import { RestaurantFood } from '../../../models/restaurant-food';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SessionStorageService } from '../../../services/session-storage.service';

@Component({
  selector: 'app-view-food-items',
  templateUrl: './view-food-items.component.html',
  styleUrl: './view-food-items.component.css'
})
export class ViewFoodItemsComponent {

  restaurant: any;
  restaurantId: any;
  foodForm!:FormGroup;
  foodUpdateForm!: FormGroup;
  foods: any[] = [];
  restaurantFoodId!: number;
  rate!:number
  
  constructor(private restaurantService: RestaurantService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private sessionStorageService: SessionStorageService) { }

  ngOnInit(): void {
    this.restaurantId = this.route.snapshot.paramMap.get("restId")
    this.getRestaurantById(this.restaurantId); 
    this.getFoodsByRestaurantId(this.restaurantId);
    this.initUpdateForm();
    this.initForm();
  }

  initForm(): void {
    this.foodForm = this.formBuilder.group({
      foodName: ['', Validators.required],
      rate: ['', Validators.required],
      foodImage: ['', Validators.required]
    });
  }

  initUpdateForm(): void {
    this.foodUpdateForm = this.formBuilder.group({
      rate: ['', Validators.required],
    });
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
    Swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure you want to delete it?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
    
        this.restaurantService.deleteFoodItem(foodId).subscribe(
          () => {
            
            this.foods = this.foods.filter(food => food.id !== foodId);
            
            Swal.fire(
              'Deleted!',
              'Your food item has been deleted.',
              'success'
            );
          },
          (error) => {
            console.error('Error deleting food item:', error);
           
            Swal.fire(
              'Error!',
              'Failed to delete food item. Please try again later.',
              'error'
            );
          }
        );
      }
    });
  }
  updateFoodItem( foodId: number): void {
    this.restaurantFoodId = foodId;

    this.restaurantService.getRestaurantFoodItem(this.restaurantFoodId).subscribe(response => {
      this.rate = response.rate
      
  
    })
  }

  submitForm() {

    Swal.fire({
      title: 'Are you sure want to Add Food Item?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Add Food Item!',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {

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
        

        Swal.fire(
          'Food Item Added Successfully!',
          '',
          'success'
        ).then((result) => {

          if (result.value) {

            window.location.reload();
          }
        });
      }
    })
  }

  submitUpdateForm(): void {

    Swal.fire({
      title: 'Are you sure want to update food Price?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Update it!',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        if (this.foodUpdateForm.valid) {
          let updatedRate = this.foodUpdateForm.value.rate;


          this.restaurantService.updateRestaurantFoodRate(this.restaurantFoodId, updatedRate).subscribe(() => {

            this.router.navigate(['/restaurant/dashboard', this.restaurantId]);

          }, error => {
            console.error('Error updating restaurant food rate:', error);

          });


          this.router.navigate(['/restaurant/dashboard', this.restaurantId]);
        }

        Swal.fire(
          'Food Price Updated Successfully!',
          '',
          'success'
        ).then((result) => {

          if (result.value) {

            window.location.reload();
          }
        });
      }
    })
  }


  

}
