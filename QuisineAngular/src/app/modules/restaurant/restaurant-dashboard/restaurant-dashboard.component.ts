import { Component, ElementRef, ViewChild } from '@angular/core';
import { RestaurantService } from '../../../services/restaurant.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Restaurant } from '../../../models/restaurant';
import Swal from 'sweetalert2';
// import * as bootstrap from 'bootstrap';


@Component({
  selector: 'app-restaurant-dashboard',
  templateUrl: './restaurant-dashboard.component.html',
  styleUrl: './restaurant-dashboard.component.css'
})
export class RestaurantDashboardComponent {
  @ViewChild('updateModal') updateModal!: ElementRef; // Reference to the modal element

  restaurantForm!: FormGroup;
  restaurant: any;
  restaurantId:any;
  

  constructor(private restaurantService: RestaurantService,private route:ActivatedRoute,private router:Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.restaurantId = this.route.snapshot.paramMap.get("restId");
    this.initForm();
    this.getRestaurantById(this.restaurantId);
    
    
  }

  initForm(): void {
    this.restaurantForm = this.fb.group({
      userName: ['', Validators.required],
      userCity: ['', Validators.required],
      userState: ['', Validators.required],
      userPin: ['', Validators.required],
      userContact: ['', Validators.required],
      userImg: ['', Validators.required]
      

    });
  }

  getRestaurantById(id: number): void {
    this.restaurantService.getRestaurantById(id).subscribe(
      (data: Restaurant) => {
        this.restaurant = data;
        this.restaurantForm.patchValue({
          userName: this.restaurant.userName,
          userContact: this.restaurant.userContact,
          userCity: this.restaurant.userCity,
          userState: this.restaurant.userState,
          userPin: this.restaurant.userPin,
          userImg:this.restaurant.userImg
        });
      },
      (error) => {
        console.error('Error fetching restaurant:', error);
      }
    );
  }

  


  updateRestaurant() {
    
    Swal.fire({
      title: 'Are you sure want to Update Profile?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Update Profile!',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {

        if (this.restaurantForm.valid) {
          const updatedRestaurant: Restaurant = {
            userId: this.restaurantId,
            userName: this.restaurantForm.value.userName,
            userContact: this.restaurantForm.value.userContact,
            userCity: this.restaurantForm.value.userCity,
            userState: this.restaurantForm.value.userState,
            userPin: this.restaurantForm.value.userPin,
            userEmail: this.restaurant.userEmail,
            userPass: this.restaurant.userPass,
            role: this.restaurant.role,
            userImg: this.restaurantForm.value.userImg.substring(12),
            restOwnerName: this.restaurant.restOwnerName,
            userAddress: this.restaurant.userAddress
          };
          this.restaurantService.updateRestaurant(updatedRestaurant).subscribe(
            () => {
              console.log('Restaurant updated successfully');
              this.router.navigate(['/restaurant/dashboard', this.restaurantId]);
            },
            (error) => {
              console.error('Error updating restaurant:', error);
            }
    
          );
    
        }
        // this.custService.updateCustomer(new Customer(this.customerId, this.user.value.userName!, this.user.value.userEmail!, this.user.value.userPass!, this.userImage, this.user.value.userContact!, this.user.value.userAddress!, this.user.value.userCity!, this.customer.userState, this.user.value.userPin!, "customer")).subscribe(response => {
        // });

        Swal.fire(
          'Profile Updated Successfully!',
          '',
          'success'
        ).then((result) => {

          if(result.value) {

            window.location.reload();
          }
        });
      } 
    })
  }


 
  
  

  

}
