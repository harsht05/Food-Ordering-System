import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerLogoutComponent } from './customer-logout.component';

describe('CustomerLogoutComponent', () => {
  let component: CustomerLogoutComponent;
  let fixture: ComponentFixture<CustomerLogoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerLogoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerLogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
