import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { HeaderComponent } from './header/header.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { PaymentGatewayComponent } from './payment-gateway/payment-gateway.component';
import { CustomerLogoutComponent } from './customer-logout/customer-logout.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateCustomerComponent } from './update-customer/update-customer.component';
import { ViewCustomerComponent } from './view-customer/view-customer.component';
import { ViewOrdersComponent } from './view-orders/view-orders.component';

@NgModule({
  declarations: [
    AddToCartComponent,
    CustomerDashboardComponent,
    HeaderComponent,
    OrderSummaryComponent,
    PaymentGatewayComponent,
    CustomerLogoutComponent,
    UpdateCustomerComponent,
    ViewCustomerComponent,
    ViewOrdersComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatButtonModule
  ]
})
export class CustomerModule { }
