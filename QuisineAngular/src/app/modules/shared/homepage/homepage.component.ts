import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Restaurant } from '../../../models/restaurant';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

  constructor(private userService:UserService){}
  restaurants:Restaurant[] = [];
 

  ngOnInit() {

    this.userService.getAllRestaurants().subscribe(response => {
      this.restaurants = response;
      console.log(this.restaurants);
    });
  }
  homesubmit(){
    Swal.fire(
      'We will surely get back to you as soon as possible',
      '',
      'success'
    )
  }
}
