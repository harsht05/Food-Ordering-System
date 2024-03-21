import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Orders } from '../models/orders';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  private baseUrl='http://localhost:8080/customer/';

  addCustomerOrder(order:Orders) : Observable<Orders> {

    return this.http.post<Orders>(`${this.baseUrl}placeOrder`, order);
  }

  updateCustomer(customer: Customer) : Observable<Customer> {

    return this.http.post<Customer>(`${this.baseUrl}updateCustomer`, customer);
  } 

  getCustomerOrders(customerId : number) : Observable<Orders[]> {

    return this.http.get<Orders[]>(`${this.baseUrl}getCustomerOrders/${customerId}`);
  }
}
