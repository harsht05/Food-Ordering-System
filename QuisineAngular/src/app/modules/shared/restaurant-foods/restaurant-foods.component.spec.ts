import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantFoodsComponent } from './restaurant-foods.component';

describe('RestaurantFoodsComponent', () => {
  let component: RestaurantFoodsComponent;
  let fixture: ComponentFixture<RestaurantFoodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RestaurantFoodsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RestaurantFoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
