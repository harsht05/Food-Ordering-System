import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { RestaurantFood } from '../models/restaurant-food';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private http: HttpClient) { }

  private baseUrl='http://localhost:8080/restaurant/';

  getRestaurantFoodById(id:number) : Observable<RestaurantFood[]> {

    return this.http.get<RestaurantFood[]>(`${this.baseUrl}getRestaurantFoods/${id}`);
  }
}
