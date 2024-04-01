import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient) {}

  private baseUrl = 'http://localhost:8080/customer/';

  getCountsByExperience():Observable<number[]>{
    return this.http.get<number[]>(`${this.baseUrl}getcounts`)
  }
}
