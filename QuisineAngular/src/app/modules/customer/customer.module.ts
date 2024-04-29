import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { PaymentGatewayComponent } from './payment-gateway/payment-gateway.component';
import { CustomerLogoutComponent } from './customer-logout/customer-logout.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewOrdersComponent } from './view-orders/view-orders.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { SharedModule } from '../shared/shared.module';
import { DeleteOrderComponent } from './delete-order/delete-order.component';

@NgModule({
  declarations: [
    OrderSummaryComponent,
    PaymentGatewayComponent,
    CustomerLogoutComponent,
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
