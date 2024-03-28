import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { PaymentGatewayComponent } from './payment-gateway/payment-gateway.component';
import { CustomerLogoutComponent } from './customer-logout/customer-logout.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateCustomerComponent } from './update-customer/update-customer.component';
import { ViewCustomerComponent } from './view-customer/view-customer.component';
import { ViewOrdersComponent } from './view-orders/view-orders.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { SharedModule } from '../shared/shared.module';
import { DeleteOrderComponent } from './delete-order/delete-order.component';

@NgModule({
  declarations: [
    AddToCartComponent,
    CustomerDashboardComponent,
    OrderSummaryComponent,
    PaymentGatewayComponent,
    CustomerLogoutComponent,
    UpdateCustomerComponent,
    ViewCustomerComponent,
    ViewOrdersComponent,
    FeedbackComponent,
    DeleteOrderComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    MatMenuModule,
    MatButtonModule
  ]
})
export class CustomerModule { }
