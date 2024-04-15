import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityRestaurantsComponent } from './city-restaurants.component';

describe('CityRestaurantsComponent', () => {
  let component: CityRestaurantsComponent;
  let fixture: ComponentFixture<CityRestaurantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CityRestaurantsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CityRestaurantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
