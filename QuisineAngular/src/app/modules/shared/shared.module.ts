import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RestaurantFoodsComponent } from './restaurant-foods/restaurant-foods.component';
import { AllRestaurantsComponent } from './all-restaurants/all-restaurants.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HomepageComponent,
    RestaurantFoodsComponent,
    AllRestaurantsComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    HomepageComponent,
    HeaderComponent,
    FooterComponent,
    AllRestaurantsComponent,
    RestaurantFoodsComponent
  ]
})
export class SharedModule { }
