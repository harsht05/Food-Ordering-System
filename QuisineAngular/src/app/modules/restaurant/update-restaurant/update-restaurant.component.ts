import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantService } from '../../../services/restaurant.service';
import { Restaurant } from '../../../models/restaurant';
import { response } from 'express';

@Component({
  selector: 'app-update-restaurant',
  templateUrl: './update-restaurant.component.html',
  styleUrls: ['./update-restaurant.component.css']
})
export class UpdateRestaurantComponent implements OnInit {

  restaurantForm!: FormGroup;
  restaurantId: any;
  restaurant: any;

  constructor(
    private fb: FormBuilder,
    private restaurantService: RestaurantService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

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
      userImage: ['', Validators.required]
      

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
          userImg:this.restaurant.userImg,

        });
      },
      (error) => {
        console.error('Error fetching restaurant:', error);
      }
    );
  }

  updateRestaurant(): void {
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
        restOwnerName:this.restaurantForm.value.restOwnerName,
        userAddress:this.restaurantForm.value.userAddress
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
  }



  cancelUpdate(): void {
    this.router.navigate(['/restaurant/dashboard', this.restaurantId]);
  }
}
