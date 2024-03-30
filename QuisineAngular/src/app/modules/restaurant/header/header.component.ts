import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStorageService } from '../../../services/session-storage.service';

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

    this.sessionStorageService.clearStorage();
    this.router.navigate(['']);

  }

}
