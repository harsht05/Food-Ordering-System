import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ViewAllCustomersComponent } from './view-all-customers/view-all-customers.component';
import { ViewAllRestaurantsComponent } from './view-all-restaurants/view-all-restaurants.component';
import { ViewAllOrdersComponent } from './view-all-orders/view-all-orders.component';
import { AdminlogoutComponent } from './adminlogout/adminlogout.component';
import { PageNotFoundComponent } from '../../page-not-found/page-not-found.component';
import { ViewAllFeedbackComponent } from './view-all-feedback/view-all-feedback.component';

const routes: Routes = [
  {
    path: "dashboard",
    component:AdminDashboardComponent
  },
  {
    path: "viewCustomers",
    component: ViewAllCustomersComponent
  },
  {
    path: "viewRestaurants",
    component: ViewAllRestaurantsComponent
  },
  {
    path: "viewOrders",
    component: ViewAllOrdersComponent
  },
  {
    path: "logout",
    component: AdminlogoutComponent
  },
  {
    path: "viewFeedbacks",
    component: ViewAllFeedbackComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
 
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
