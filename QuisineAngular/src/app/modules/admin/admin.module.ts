import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { SideNavbarComponent } from './side-navbar/side-navbar.component';
import { ViewAllCustomersComponent } from './view-all-customers/view-all-customers.component';
import { ViewAllOrdersComponent } from './view-all-orders/view-all-orders.component';
import { ViewAllRestaurantsComponent } from './view-all-restaurants/view-all-restaurants.component';
import { AdminlogoutComponent } from './adminlogout/adminlogout.component';
import { ViewAllFeedbackComponent } from './view-all-feedback/view-all-feedback.component';
import { SharedModule } from '../shared/shared.module';
import { SalesComponent } from './sales/sales.component';
import { UsersComponent } from './users/users.component';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    SideNavbarComponent,
    ViewAllCustomersComponent,
    ViewAllOrdersComponent,
    ViewAllRestaurantsComponent,
    AdminlogoutComponent,
    ViewAllFeedbackComponent,
    SalesComponent,
    UsersComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
