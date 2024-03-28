import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { RestaurantFood } from '../models/restaurant-food';
import { Restaurant } from '../models/restaurant';
import { Orders } from '../models/orders';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private http: HttpClient) { }

  private baseUrl='http://localhost:8080/restaurant/';

  getAllRestaurants(): Observable<Restaurant[]> {

    return this.http.get<Restaurant[]>(`${this.baseUrl}getAllRestaurants`);
  }

  getRestaurantFoodById(id: number): Observable<RestaurantFood[]> {

    return this.http.get<RestaurantFood[]>(`${this.baseUrl}getRestaurantFoods/${id}`);
  }

  getRestaurantById(id: number): Observable<Restaurant> {

    return this.http.get<Restaurant>(`${this.baseUrl}getRestaurantById/${id}`);
  }

  deleteFoodItem(foodId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}deleteRestaurantFood/${foodId}`);
  }

  addFoodItem(restaurantFood: RestaurantFood): Observable<any> {
    return this.http.post(`${this.baseUrl}addRestaurantFood`, restaurantFood);
  }

  getRestaurantOrders(restaurantId: number): Observable<Orders[]> {
    const url = `${this.baseUrl}getRestaurantOrders/${restaurantId}`;
    return this.http.get<Orders[]>(url);
  }

  updateRestaurant(updatedRestaurant: Restaurant): Observable<any> {
    const url = `${this.baseUrl}updateRestaurant/${updatedRestaurant.userId}`; // Assuming you have an 'id' property in your Restaurant model
    return this.http.put<any>(url, updatedRestaurant);
  }

  getFoodItem(foodId: number): Observable<RestaurantFood> {
    const url = `${this.baseUrl}getFoodItem/${foodId}`;
    // Assuming API endpoint for fetching food items
    console.log(this.http.get<RestaurantFood>(url));

    return this.http.get<RestaurantFood>(url);
  }

  getRestaurantFoodItem(restId: number): Observable<RestaurantFood> {

    return this.http.get<RestaurantFood>(`${this.baseUrl}getRestaurantFoodById/${restId}`);
  }

  updateRestaurantFoodRate(restaurantFoodId: number, updatedRate: any): Observable<any> {
    // Replace 'updateFood' with your actual update endpoint
    console.log("hyfesauiafgusieafgiua" + restaurantFoodId);
    console.log("hkvfsdhfhsdfhdshfdshfk" + updatedRate);

    const updateInfo = {
      foodId: restaurantFoodId,
      updatedRate: updatedRate
    }

    return this.http.put<any>(`${this.baseUrl}updateRestaurantFoodRate?foodId=${restaurantFoodId}&updatedRate=${updatedRate}`, {})
  }
}
