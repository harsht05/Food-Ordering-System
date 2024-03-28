import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFoodItemsComponent } from './add-food-items.component';

describe('AddFoodItemsComponent', () => {
  let component: AddFoodItemsComponent;
  let fixture: ComponentFixture<AddFoodItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddFoodItemsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddFoodItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
