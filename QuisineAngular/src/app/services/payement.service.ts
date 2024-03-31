import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PayementService {

  constructor(private http: HttpClient) { }

  private baseUrl='http://localhost:8080/payement/';

  generatePayementLink(custId:number, totalAmt:number) : Observable<any> {

    return this.http.post<any>(`${this.baseUrl}generateLink/${totalAmt}`, custId);
  }
}
