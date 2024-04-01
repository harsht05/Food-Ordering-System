import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { RestaurantFood } from '../../../models/restaurant-food';
import { SessionStorageService } from '../../../services/session-storage.service';
import { RestaurantService } from '../../../services/restaurant.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-restaurant-foods',
  templateUrl: './restaurant-foods.component.html',
  styleUrl: './restaurant-foods.component.css'
})
export class RestaurantFoodsComponent {

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private restService: RestaurantService, 
    private sessionStorageService : SessionStorageService,
    private router: Router
  ) {}

  restId: number = 0;
  restFood: RestaurantFood[] = [];
  restName: string = '';

  map: Map<RestaurantFood, number> = new Map();
  totalMealCharges: number = 0;
  deliveryCharges: number = 40;
  convenienceFee: number = 20;
  totalPrice: number = 0;
  proceedButtonState: boolean = false;

  ngOnInit() {
    this.restId = Number(this.route.snapshot.paramMap.get('restId'));
    this.sessionStorageService.setItem("restId", this.restId);

    this.userService.getRestaurantById(this.restId).subscribe((response) => {
      this.restName = response.userName;
    });

    this.restService.getRestaurantFoodById(this.restId).subscribe((response) => {
      this.restFood = response;
    });
  }

  toggleQuantityButtons(foodRest: RestaurantFood): void {
    if (!foodRest.addedToCart) {
      foodRest.addedToCart = true;
      foodRest.quantity = 1;
      this.map.set(foodRest, foodRest.quantity);
    }
    this.calculateTotals();
    this.udateProceedButtonState();
  }

  increaseQuantity(foodRest: RestaurantFood): void {
    
    if(foodRest.quantity == 5) {

      Swal.fire({
        title: 'You can Order only 5 quantity of per food at a time....',
        text: ``,
        icon: 'warning',
        // showCancelButton: true,
        confirmButtonText: 'OK',
        allowOutsideClick: false,
        allowEscapeKey: false
      }).then((result) => {
        if (result.value) {
        } 
      });
    }

    else {
      
      foodRest.quantity++;
      this.map.set(foodRest, foodRest.quantity);
      this.calculateTotals();
      this.udateProceedButtonState();
    }
  }

  decreaseQuantity(foodRest: RestaurantFood): void {
    if (foodRest.quantity > 0) {
      foodRest.quantity--;
      this.map.set(foodRest, foodRest.quantity);

      if (foodRest.quantity === 0) {
        foodRest.addedToCart = false;
        this.map.delete(foodRest);
      }
      this.calculateTotals();
      this.udateProceedButtonState();
    }
  }

  calculateTotals(): void {
    this.totalMealCharges = this.restFood.reduce(
      (acc, curr) => acc + curr.rate * (curr.quantity || 0),
      0
    );
    this.totalPrice =
      this.totalMealCharges + this.deliveryCharges + this.convenienceFee;
  }

  udateProceedButtonState(): void {
    this.proceedButtonState = this.map.size > 0;
  }

  proceedToPayment(): void {

    console.log(this.map);

    this.sessionStorageService.setMap("mealsMap", this.map);
    this.sessionStorageService.setItem("totalCharges", this.totalMealCharges);
    
    this.router.navigate(['customer/payementGateway']);
  }
}
