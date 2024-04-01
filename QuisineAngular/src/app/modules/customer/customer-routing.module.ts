import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { PageNotFoundComponent } from '../../page-not-found/page-not-found.component';
import { ViewOrdersComponent } from './view-orders/view-orders.component';
import { CustomerLogoutComponent } from './customer-logout/customer-logout.component';
import { DeleteOrderComponent } from './delete-order/delete-order.component';
import { PaymentGatewayComponent } from './payment-gateway/payment-gateway.component';
import { FeedbackComponent } from './feedback/feedback.component';

const routes: Routes = [
  {
    path: "payementGateway",
    component: PaymentGatewayComponent
  },
  {
    path: "orderSummary",
    component: OrderSummaryComponent
  },
  {
    path: "viewOrders",
    component: ViewOrdersComponent
  },
  {
    path: "logout",
    component: CustomerLogoutComponent
  },
  {
    path: "feedback",
    component: FeedbackComponent},
    {
    path: "deleteOrder/:orderId",
    component: DeleteOrderComponent
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
export class CustomerRoutingModule { }
