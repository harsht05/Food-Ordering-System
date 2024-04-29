import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Restaurant } from '../models/restaurant';
import { Customer } from '../models/customer';
import { Orders } from '../models/orders';
import { Feedback } from '../models/feedback';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  
  constructor(private http: HttpClient) {}

  private baseUrl = 'http://localhost:8080/admin/';

  getAllRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(`${this.baseUrl}getAllRestaurants`);
  }

  getAllCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.baseUrl}getAllCustomers`);
  }
  getAllOrders(): Observable<Orders[]> {
    return this.http.get<Orders[]>(`${this.baseUrl}getAllOrders`);
  }
  deleteRestaurantById(id:number,block:boolean) : Observable<Restaurant[]> {

    return this.http.put<Restaurant[]>(`${this.baseUrl}deleteRestaurant/${id}`,block,{responseType:'text' as 'json'});
  }
  getRestaurantById(id:number) : Observable<Restaurant[]> {

    return this.http.get<Restaurant[]>(`${this.baseUrl}getRestaurantById/${id}`,{responseType:'text' as 'json'});
  }
  deleteCustomerById(id:number,block:boolean) : Observable<Customer[]> {

    return this.http.put<Customer[]>(`${this.baseUrl}deleteCustomer/${id}`,block,{responseType:'text' as 'json'});
  }
  getAllFeedbacks() : Observable<Feedback[]> {

    return this.http.get<Feedback[]>(`${this.baseUrl}getAllFeedback`);
  }
  getOrdersByDate(): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}orderCountsByDate`)
  }
}
