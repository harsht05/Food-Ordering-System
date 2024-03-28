import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendVerifyOtpComponent } from './send-verify-otp.component';

describe('SendVerifyOtpComponent', () => {
  let component: SendVerifyOtpComponent;
  let fixture: ComponentFixture<SendVerifyOtpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SendVerifyOtpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SendVerifyOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
