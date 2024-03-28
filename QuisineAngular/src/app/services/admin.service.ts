import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Restaurant } from '../models/restaurant';
import { Customer } from '../models/customer';
import { Orders } from '../models/orders';

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
  deleteRestaurantById(id:number) : Observable<Restaurant[]> {

    return this.http.get<Restaurant[]>(`${this.baseUrl}deleteRestaurant/${id}`);
  }
  deleteCustomerById(id:number) : Observable<Customer[]> {

    return this.http.get<Customer[]>(`${this.baseUrl}deleteCustomer/${id}`);
  }
}
