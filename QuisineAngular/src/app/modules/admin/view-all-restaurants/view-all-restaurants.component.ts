import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../../services/admin.service';
import { Restaurant } from '../../../models/restaurant';

@Component({
  selector: 'app-view-all-restaurants',
  templateUrl: './view-all-restaurants.component.html',
  styleUrl: './view-all-restaurants.component.css'
})
export class ViewAllRestaurantsComponent {
  constructor(private route:Router,private adminService:AdminService){

  }
  showrest: Restaurant[]=[]; 

  ngOnInit():void {
    this.adminService.getAllRestaurants().subscribe(response => {
      this.showrest = response;
      console.log(this.showrest);
    });
  }
}
