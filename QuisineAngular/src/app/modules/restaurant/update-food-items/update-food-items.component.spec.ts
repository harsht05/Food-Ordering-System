import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFoodItemsComponent } from './update-food-items.component';

describe('UpdateFoodItemsComponent', () => {
  let component: UpdateFoodItemsComponent;
  let fixture: ComponentFixture<UpdateFoodItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateFoodItemsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateFoodItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
