import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionStorageService } from '../../../services/session-storage.service';
import { Customer } from '../../../models/customer';
import { CustomerService } from '../../../services/customer.service';
import { Feedback } from '../../../models/feedback';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  feedbackForm!: FormGroup;
  loggedInCustomer: Customer | null = null;
  private customerSubscription: Subscription | undefined;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private sessionStorage: SessionStorageService,
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
    this.feedbackForm = this.fb.group({
      username: ['', Validators.required],
      useremail: ['', [Validators.required, Validators.email]],
      feedbackDesc: ['', Validators.required],
      experience: ['', Validators.required],
      recommend: ['', Validators.required],
    });

    this.initializeForm();
  }

  submitForm() {
    if (this.feedbackForm.valid) {
      const formData = this.feedbackForm.value;
      this.customerService.addCustomerFeedback(new Feedback(
        0,
        formData.username,
        formData.useremail,
        formData.experience,
        formData.feedbackDesc,
        Number(formData.recommend)
      )).subscribe(
        () => {
          console.log(' successfully');
          Swal.fire(
            'Feedback submitted Successfully!!',
            '',
            'success'
          );
          this.route.navigate(['/restaurants']);
        },
        error => {
          console.error('Error registering user:', error);
          Swal.fire(
            'Registration Failed',
            'An error occurred while registering user',
            'error'
          );
        }
      );
    }
  }

  skipForm() {
    this.route.navigate(['/restaurants']);
  }

  initializeForm() {
    const customerId = this.sessionStorage.getItem("custId");
    if (customerId) {
      this.fetchCustomerData(customerId);
    }
  }

  fetchCustomerData(customerId: number) {
    this.customerSubscription = this.customerService.getCustomerById(customerId).subscribe(
      (customer: Customer) => {
        this.loggedInCustomer = customer;
        this.feedbackForm.patchValue({
          username: this.loggedInCustomer.userName,
          useremail: this.loggedInCustomer.userEmail,
        });
      },
      error => {
        console.error('Error fetching customer data:', error);
      }
    );
  }

  ngOnDestroy() {
    if (this.customerSubscription) {
      this.customerSubscription.unsubscribe();
    }
  }
}
