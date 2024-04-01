import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { Restaurant } from '../../../models/restaurant';
import { Food } from '../../../models/food';

// interface Restaurant {
//   userName: string;

// }

// interface Food {
//   foodName: string;
// }

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchInput: string = '';
  restaurantResults: Restaurant[] = [];
  foodResults: Food[] = [];
  queryParam!: string;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.queryParam = params['query'];
      console.log(this.queryParam+'getgtgeg '+params['query']);

      if (this.queryParam) {
        this.searchInput = this.queryParam;
        this.fetchRestaurantResults(this.queryParam);
        // this.fetchFoodResults(this.queryParam);
      }
    });
  }

  onInputChange() {
    const query = this.searchInput.trim();
    if (query.length > 0) {
      this.fetchRestaurantResults(query);
      // this.fetchFoodResults(query);
    } else {
      this.clearResults();
    }
  }

  fetchRestaurantResults(query: string): void {
    const encodedQuery = encodeURIComponent(query);
    const url = `http://localhost:8080/customers/searchByName?query=${encodedQuery}`;
    this.http.get<Restaurant[]>(url)
      .pipe(
        catchError(this.handleError)
      )
      .subscribe(data => {
        console.log(data+"rest");
        
        this.restaurantResults = data;
        console.log(this.restaurantResults);
        
      });
  }

  // fetchFoodResults(query: string): void {
  //   const encodedQuery = encodeURIComponent(query);
  //   const url = `/foods/searchByPartialName?name=${encodedQuery}`;
  //   this.http.get<Food[]>(url)
  //     .pipe(
  //       catchError(this.handleError)
  //     )
  //     .subscribe(data => {
  //       this.foodResults = data;
  //     });
  // }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(error);
  }

  clearResults() {
    this.restaurantResults = [];
    this.foodResults = [];
  }
}
