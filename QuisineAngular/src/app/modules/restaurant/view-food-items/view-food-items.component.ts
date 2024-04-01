import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantService } from '../../../services/restaurant.service';
import Swal from 'sweetalert2';
import { RestaurantFood } from '../../../models/restaurant-food';

@Component({
  selector: 'app-view-food-items',
  templateUrl: './view-food-items.component.html',
  styleUrl: './view-food-items.component.css'
})
export class ViewFoodItemsComponent {

  restaurant: any;
  restaurantId: any;
  foodForm:any;
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
        // this.custService.updateCustomer(new Customer(this.customerId, this.user.value.userName!, this.user.value.userEmail!, this.user.value.userPass!, this.userImage, this.user.value.userContact!, this.user.value.userAddress!, this.user.value.userCity!, this.customer.userState, this.user.value.userPin!, "customer")).subscribe(response => {
        // });

        Swal.fire(
          'Food Item Added SUccessfully!',
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
