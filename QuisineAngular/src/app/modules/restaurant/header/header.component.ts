import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStorageService } from '../../../services/session-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private router: Router, private sessionStorageService : SessionStorageService) {}

  
  restaurantId = this.sessionStorageService.getItem("restaurantId")

  // goToViewFoodItems(): void {
  //   this.router.navigate(['/view-food-items']);
  // }

  logout() {

   

    Swal.fire({
      title: 'Are you sure?,You want to Logout!',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.sessionStorageService.clearStorage();
    this.router.navigate(['']);

      } 
    });
  }

  isLoggedIn(): boolean {
    
    return this.sessionStorageService.getItem('restaurantId') !== null;
  }

  isAdminOrCustomer() : boolean {

    return this.sessionStorageService.getItem('isAdmin') || this.sessionStorageService.getItem("custId") !== null;
  }

}
