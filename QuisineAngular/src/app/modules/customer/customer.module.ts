import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { HeaderComponent } from './header/header.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { PaymentGatewayComponent } from './payment-gateway/payment-gateway.component';


@NgModule({
  declarations: [
    AddToCartComponent,
    CustomerDashboardComponent,
    HeaderComponent,
    OrderSummaryComponent,
    PaymentGatewayComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule
  ]
})
export class CustomerModule { }
