import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Orders } from '../models/orders';
import { Customer } from '../models/customer';
import { Feedback } from '../models/feedback';
import { Restaurant } from '../models/restaurant';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  private baseUrl='http://localhost:8080/customer/';

  getCities() : Observable<string[]> {
    
    return this.http.get<string[]>(`${this.baseUrl}getCities`);
  }

  getRestaurantByCity(city:string) : Observable<Restaurant[]> {
    
    return this.http.get<Restaurant[]>(`${this.baseUrl}getRestaurantByCity/${city}`);
  }

  addCustomerOrder(order:Orders) : Observable<Orders> {

    return this.http.post<Orders>(`${this.baseUrl}placeOrder`, order);
  }

  updateCustomer(customer: Customer) : Observable<Customer> {

    return this.http.post<Customer>(`${this.baseUrl}updateCustomer`, customer);
  } 

  getCustomerOrders(customerId : number) : Observable<Orders[]> {

    return this.http.get<Orders[]>(`${this.baseUrl}getCustomerOrders/${customerId}`);
  }

  sendOrderDetails(orders: Orders[]) : Observable<number> {

    return this.http.post<number>(`${this.baseUrl}sendOrderDetails`, orders);
  }

  cancelOrder(orderId: number): Observable<boolean> {
    
    return this.http.delete<boolean>(`${this.baseUrl}deleteOrder/${orderId}`);
  }

  getCustomerById(customerId:number):Observable<Customer> {

    return this.http.get<Customer>(`${this.baseUrl}getCustomerById/${customerId}`)
  }

  addCustomerFeedback(feedback:Feedback):Observable<Feedback> {

    return this.http.post<Feedback>(`${this.baseUrl}addFeedback`,feedback)
  }
}
