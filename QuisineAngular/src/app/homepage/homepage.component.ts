import { Component } from '@angular/core';
import { Restaurant } from '../models/restaurant';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  allRestaurants: Restaurant[] = [];
  constructor(){

  }

}
