import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

interface Restaurant {
  userName: string;
}

interface Food {
  foodName: string;
}
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  searchInput: string = '';
  restaurantResults: Restaurant[] = [];
  foodResults: Food[] = [];


  constructor(private http: HttpClient) {}

  onInputChange() {
    const query = this.searchInput.trim();
    if (query.length > 0) {
      this.fetchRestaurantResults(query);
      this.fetchFoodResults(query);
    } else {
      this.clearResults();
    }
  }

  
  fetchRestaurantResults(query: string): void {
    const encodedQuery = encodeURIComponent(query);
    const url = `/restaurants/searchByPartialName?query=${encodedQuery}`;
    this.http.get<Restaurant[]>(url)
      .pipe(
        catchError(this.handleError)
      )
      .subscribe(data => {
        this.restaurantResults = data;
      });
  }

  fetchFoodResults(query: string): void {
    const encodedQuery = encodeURIComponent(query);
    const url = `/foods/searchByPartialName?query=${encodedQuery}`;
    this.http.get<Food[]>(url)
      .pipe(
        catchError(this.handleError)
      )
      .subscribe(data => {
        this.foodResults = data;
      });
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(error); }


  clearResults() {
    this.restaurantResults = [];
    this.foodResults = [];
  }
}
