import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllFeedbackComponent } from './view-all-feedback.component';

describe('ViewAllFeedbackComponent', () => {
  let component: ViewAllFeedbackComponent;
  let fixture: ComponentFixture<ViewAllFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewAllFeedbackComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewAllFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
