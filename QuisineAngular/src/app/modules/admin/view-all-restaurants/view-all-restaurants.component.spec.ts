import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllRestaurantsComponent } from './view-all-restaurants.component';

describe('ViewAllRestaurantsComponent', () => {
  let component: ViewAllRestaurantsComponent;
  let fixture: ComponentFixture<ViewAllRestaurantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewAllRestaurantsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewAllRestaurantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
