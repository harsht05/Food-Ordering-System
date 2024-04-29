import { Component } from '@angular/core';
import { CustomerService } from '../../../services/customer.service';
import { Restaurant } from '../../../models/restaurant';
import { SessionStorageService } from '../../../services/session-storage.service';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-all-restaurants',
  templateUrl: './all-restaurants.component.html',
  styleUrl: './all-restaurants.component.css'
})
export class AllRestaurantsComponent {

  constructor(private custService:CustomerService, private userService: UserService, private storageService: SessionStorageService, private router: Router) {

  }

  restaurants:Restaurant[] = [];
  customerId: number = 0;

  ngOnInit() {

    this.userService.getAllRestaurants().subscribe(response => {
      this.restaurants = response;
    });
  }
}
