import { Component, ElementRef, ViewChild } from '@angular/core';
import { RestaurantService } from '../../../services/restaurant.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Restaurant } from '../../../models/restaurant';
import Swal from 'sweetalert2';
import { SessionStorageService } from '../../../services/session-storage.service';


@Component({
  selector: 'app-restaurant-dashboard',
  templateUrl: './restaurant-dashboard.component.html',
  styleUrl: './restaurant-dashboard.component.css'
})
export class RestaurantDashboardComponent {
  @ViewChild('updateModal') updateModal!: ElementRef; 

  restaurantForm!: FormGroup;
  restaurant: any;
  restaurantId:any;
  restImage:string='';
  

  constructor(private restaurantService: RestaurantService,private route:ActivatedRoute,private router:Router, private fb: FormBuilder, private sessionStorageService: SessionStorageService) { }

  ngOnInit(): void {
    
    
    if(this.sessionStorageService.getItem("restaurantId") === null && this.sessionStorageService.getItem("isAdmin")!=="done") {
        
      this.router.navigate(['/accessDenied']);
    }

    this.restaurantId = this.route.snapshot.paramMap.get("restId");
    this.initForm();
    this.getRestaurantById(this.restaurantId);

    
    
  }

  
  initForm(): void {
    this.restaurantForm = this.fb.group({
      userName: ['', Validators.required],
      userCity: ['', Validators.required],
      userState: ['', Validators.required],
      userPin: ['', [Validators.required, Validators.pattern('[0-9]+'), Validators.minLength(6), Validators.maxLength(6)]],

      userContact: ['', [Validators.required, Validators.pattern('[0-9]+'), Validators.minLength(10), Validators.maxLength(10)]],
      userImg: ['', [Validators.required]]
      

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

        this.restImage = this.restaurant.userImg;
      },
      (error) => {
        console.error('Error fetching restaurant:', error);
      }
    );
  }

  isAdminOrCustomer() : boolean {

    return this.sessionStorageService.getItem('isAdmin') || this.sessionStorageService.getItem("custId") !== null;
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
            userImg: this.restImage,
            restOwnerName: this.restaurant.restOwnerName,
            isBlocked: false,
            userAddress: this.restaurant.userAddress
          };
          this.restaurantService.updateRestaurant(updatedRestaurant).subscribe(
            () => {
              this.router.navigate(['/restaurant/dashboard', this.restaurantId]);
            },
            (error) => {
              console.error('Error updating restaurant:', error);
            }
    
          );
    
        }
        

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