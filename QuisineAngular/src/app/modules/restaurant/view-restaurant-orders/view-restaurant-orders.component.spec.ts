import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRestaurantOrdersComponent } from './view-restaurant-orders.component';

describe('ViewRestaurantOrdersComponent', () => {
  let component: ViewRestaurantOrdersComponent;
  let fixture: ComponentFixture<ViewRestaurantOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewRestaurantOrdersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewRestaurantOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
