import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminlogoutComponent } from './adminlogout.component';

describe('AdminlogoutComponent', () => {
  let component: AdminlogoutComponent;
  let fixture: ComponentFixture<AdminlogoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminlogoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminlogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
