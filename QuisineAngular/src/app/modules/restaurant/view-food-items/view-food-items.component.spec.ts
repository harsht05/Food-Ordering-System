import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFoodItemsComponent } from './view-food-items.component';

describe('ViewFoodItemsComponent', () => {
  let component: ViewFoodItemsComponent;
  let fixture: ComponentFixture<ViewFoodItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewFoodItemsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewFoodItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
