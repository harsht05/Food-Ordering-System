import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Restaurant } from '../models/restaurant';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private baseUrl='http://localhost:8080/user/';

  getRestaurantById(id:number) : Observable<Restaurant> {

    return this.http.get<Restaurant>(`${this.baseUrl}getUserById/${id}`);
  }

  getAllRestaurants() : Observable<Restaurant[]> {

    return this.http.get<Restaurant[]>(`${this.baseUrl}getAllRestaurants`);
  }

  getCustomerById(id:number) : Observable<Customer> {

    return this.http.get<Customer>(`${this.baseUrl}getUserById/${id}`);
  }

  sendOtp(email: string): Observable<number> {
    return this.http.post<number>(`${this.baseUrl}sendOtp`, email);
  }

  verifyOtp(otp: number): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}verifyOtp`, otp);
  }

  login(user: User): Observable<User> {
    
    return this.http.post<User>(`${this.baseUrl}userLogin`, user);
  }

  addUser(user: User): Observable<User> {

    return this.http.post<User>(`${this.baseUrl}addUser`, user);
  }

  getUserByEmail(email:string): Observable<User> {

    return this.http.post<User>(`${this.baseUrl}findByEmail`, email);
  }

  changePassword(user: User): Observable<User> {
    
    return this.http.post<User>(`${this.baseUrl}forgotPassword`, user);
  }


}
  // constructor(private http: HttpClient) { }

  // private baseUrl = 'http://localhost:8080/user/';

  // addUser(user: User): Observable<User> {
  //   return this.http.post<User>(`${this.baseUrl}addUser`, user);
  // }

  // // register(user: User): Observable<User> {
  // //   return this.http.post<User>(`${this.baseUrl}register`, user);
  // // }

  // sendOtp(email: string): Observable<number> {
  //   return this.http.post<number>(`${this.baseUrl}sendOtp`, email);
  // }

  // verifyOtp(otp: number): Observable<boolean> {
  //   return this.http.post<boolean>(`${this.baseUrl}verifyOtp`, otp);
  // }

  // login(user: User): Observable<User> {
  //   return this.http.post<User>(`${this.baseUrl}userLogin`, user);
  // }

 

