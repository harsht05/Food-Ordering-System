import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestaurantRoutingModule } from './restaurant-routing.module';
import { RestaurantDashboardComponent } from './restaurant-dashboard/restaurant-dashboard.component';
import { AddFoodItemsComponent } from './add-food-items/add-food-items.component';
import { ViewRestaurantOrdersComponent } from './view-restaurant-orders/view-restaurant-orders.component';
import { HeaderComponent } from './header/header.component';
import { ViewFoodItemsComponent } from './view-food-items/view-food-items.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateRestaurantComponent } from './update-restaurant/update-restaurant.component';
import { UpdateFoodItemsComponent } from './update-food-items/update-food-items.component';


@NgModule({
  declarations: [
    RestaurantDashboardComponent,
    AddFoodItemsComponent,
    ViewRestaurantOrdersComponent,
    HeaderComponent,
    ViewFoodItemsComponent,
    UpdateRestaurantComponent,
    UpdateFoodItemsComponent
  ],
  imports: [
    CommonModule,
    RestaurantRoutingModule,
    ReactiveFormsModule
  ],
  exports:[
    RestaurantDashboardComponent,
    ViewFoodItemsComponent,
    ViewRestaurantOrdersComponent

  ]
})
export class RestaurantModule { }
