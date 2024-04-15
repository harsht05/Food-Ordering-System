import { Component } from '@angular/core';
import { CustomerService } from '../../../services/customer.service';
import { Restaurant } from '../../../models/restaurant';
import { SessionStorageService } from '../../../services/session-storage.service';

@Component({
  selector: 'app-city-restaurants',
  templateUrl: './city-restaurants.component.html',
  styleUrl: './city-restaurants.component.css'
})
export class CityRestaurantsComponent {

  constructor(private custService: CustomerService, private sessionStorageService: SessionStorageService) {

  }

  restaurants:Restaurant[] = [];
  city:string|null = '';

  ngOnInit() {

    this.city = this.sessionStorageService.getItem("city");

    if(this.city !== null && this.city !== '') {
      
      this.custService.getRestaurantByCity(this.city.toLowerCase()).subscribe(response => {
      
        this.restaurants = response;
      });
    }
  }
}
