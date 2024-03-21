import { Component } from '@angular/core';
import { RestaurantFood } from '../../../models/restaurant-food';
import { SessionStorageService } from '../../../services/session-storage.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-gateway',
  templateUrl: './payment-gateway.component.html',
  styleUrl: './payment-gateway.component.css'
})
export class PaymentGatewayComponent {

  constructor(private sessionStorageService: SessionStorageService, private route: Router) {

  }

  map: Map<RestaurantFood, number> = new Map();
  totalMealCharges: number = 0;

  ngOnInit() {

    if(this.sessionStorageService.getItem("custId") === null) {

      this.route.navigate(['login']);
    }

    const storedMap = this.sessionStorageService.getMap("mealsMap");
    this.totalMealCharges = this.sessionStorageService.getItem("totalCharges");

    if(storedMap !== null) {

      this.map = storedMap;
    }
    
  }

  payementForm = new FormGroup({
    cardNumber: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]+$/),
      Validators.maxLength(16),
      Validators.minLength(16)
    ]),
    cardHolder: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z\s]+$/)
    ]),
    expiryDate: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)
    ]),
    cvv: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]{3}$/)
    ]),
    agreeToTerms: new FormControl([
      Validators.required
    ])
  });

  
  submitForm(): void {
    
    this.route.navigate(['customer/orderSummary']);
  }
}
