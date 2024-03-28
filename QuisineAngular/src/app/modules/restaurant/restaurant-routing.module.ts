import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantDashboardComponent } from './restaurant-dashboard/restaurant-dashboard.component';
import { PageNotFoundComponent } from '../../page-not-found/page-not-found.component';
import { ViewFoodItemsComponent } from './view-food-items/view-food-items.component';
import { ViewRestaurantOrdersComponent } from './view-restaurant-orders/view-restaurant-orders.component';
import { AddFoodItemsComponent } from './add-food-items/add-food-items.component';
import { UpdateRestaurantComponent } from './update-restaurant/update-restaurant.component';
import { UpdateFoodItemsComponent } from './update-food-items/update-food-items.component';

const routes: Routes = [
 
      {
        path: "dashboard/:restId",
        component: RestaurantDashboardComponent
      },
      {
        path: 'viewFoodItems/:restId',
        component: ViewFoodItemsComponent
      },
      {
        path: 'viewRestaurantOrders/:restId',
        component: ViewRestaurantOrdersComponent
      },
      {
        path: 'addFoodItems/:restId',
        component: AddFoodItemsComponent
      },
      {
        path: 'updateRestaurant/:restId',
        component: UpdateRestaurantComponent
      },
      {
        path: 'updateFoodItems/:foodId/:restId',
        component: UpdateFoodItemsComponent
      },
    
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantRoutingModule { }