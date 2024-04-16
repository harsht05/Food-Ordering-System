import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Restaurant } from '../models/restaurant';
import { RestaurantFood } from '../models/restaurant-food';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  constructor(private http: HttpClient) { }

  private baseUrl='http://localhost:8080/chatbot/';

  getRestaurantsByCity(city: string) : Observable<Restaurant[]> {

    return this.http.get<Restaurant[]>(`${this.baseUrl}getRestaurantByCity/${city}`);
  }

  getRestaurantFoodById(hotelname: string) : Observable<RestaurantFood[]> {

    return this.http.get<RestaurantFood[]>(`${this.baseUrl}getRestaurantFoodByName/${hotelname}`);
  }

  getMinRestaurantFoodPrice(hotelname: string) : Observable<number> {

    return this.http.get<number>(`${this.baseUrl}getMinFoodPrice/${hotelname}`);
  }

  getMaxRestaurantFoodPrice(hotelname: string) : Observable<number> {

    return this.http.get<number>(`${this.baseUrl}getMaxFoodPrice/${hotelname}`);
  }

  getCheapRestaurant(city:string) : Observable<RestaurantFood> {

    return this.http.get<RestaurantFood>(`${this.baseUrl}getCheapHotelInCity/${city}`);
  }
}
