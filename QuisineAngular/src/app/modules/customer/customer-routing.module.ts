import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { ViewCustomerComponent } from './view-customer/view-customer.component';
import { PageNotFoundComponent } from '../../page-not-found/page-not-found.component';
import { UpdateCustomerComponent } from './update-customer/update-customer.component';
import { ViewOrdersComponent } from './view-orders/view-orders.component';
import { CustomerLogoutComponent } from './customer-logout/customer-logout.component';
import { PaymentGatewayComponent } from './payment-gateway/payment-gateway.component';

const routes: Routes = [
  {
    path: "dashboard",
    component: CustomerDashboardComponent
  },
  {
    path: "addToCart/:restId",
    component: AddToCartComponent
  },
  {
    path: "payementGateway",
    component: PaymentGatewayComponent
  },
  {
    path: "orderSummary",
    component: OrderSummaryComponent
  },
  {
    path: "viewCustomer",
    component: ViewCustomerComponent
  },
  {
    path: "updateCustomer",
    component: UpdateCustomerComponent
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
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
