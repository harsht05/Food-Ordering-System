import { Component } from '@angular/core';
import { RestaurantFood } from '../../../models/restaurant-food';
import { SessionStorageService } from '../../../services/session-storage.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
  delAddress:string='';

  ngOnInit() {

    if(this.sessionStorageService.getItem("custId") === null) {

      Swal.fire({
        title: 'Please Login To Continue....',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Login',
        cancelButtonText: 'Go Back',
        allowOutsideClick: false,
        allowEscapeKey: false 
      }).then((result) => {
        if (result.value) {
  
          this.route.navigate(['login']);
        } 
        else if (result.dismiss === Swal.DismissReason.cancel) {
          
          this.sessionStorageService.clearStorage();
          this.route.navigate(['']);
        }
      });
    }

    const storedMap = this.sessionStorageService.getMap("mealsMap");
    this.totalMealCharges = this.sessionStorageService.getItem("totalCharges");
    this.delAddress = this.sessionStorageService.getItem("custAddress");

    if(storedMap !== null) {

      this.map = storedMap;
    }

    this.payementForm.patchValue({
      delAddress: this.delAddress
    })
    
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
    delAddress: new FormControl(this.delAddress, [
      Validators.required,
      Validators.minLength(8)
    ]),
    agreeToTerms: new FormControl([
      Validators.required
    ])
  });

  
  submitForm(): void {
    
    this.sessionStorageService.setItem("delAddress", this.payementForm.value.delAddress);
    
    Swal.fire({
      title: 'Are You Sure Want to Place Order?....',
      text: `Amount Rs.${this.totalMealCharges + 60} will be debited from your account....`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Place Order',
      cancelButtonText: 'Cancel',
      allowOutsideClick: false,
      allowEscapeKey: false 
    }).then((result) => {
      if (result.value) {

        this.route.navigate(['customer/orderSummary']);
      } 
      else if (result.dismiss === Swal.DismissReason.cancel) {
        
        this.route.navigate([`/restaurantFoods/${this.sessionStorageService.getItem("restId")}`]);
      }
    });
  }
}
