import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionStorageService } from '../../../services/session-storage.service';
import { Customer } from '../../../models/customer';
import { CustomerService } from '../../../services/customer.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css'
})
export class FeedbackComponent {

  feedbackForm!: FormGroup;
  loggedInCustomer: Customer | null = null; 

  constructor(private fb: FormBuilder,private route:Router,private sessionStorage: SessionStorageService,private customerService:CustomerService) { }

  ngOnInit(): void {
    this.feedbackForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      description: ['', Validators.required],
      like: ['', Validators.required],
      recommend: ['', Validators.required],


    });

    this.initializeForm();
  }

  submitForm() {
    if (this.feedbackForm.valid) {
      
      console.log(this.feedbackForm.value);
    }
  }

  skipForm() {
    this.route.navigate(['customer/dashboard'])
  }

  initializeForm() {
    const customerId = this.sessionStorage.getItem("custId");
    if (customerId) {
      this.fetchCustomerData(customerId);
    }
  }
    fetchCustomerData(customerId: number){
      this.customerService.getCustomerById(customerId).subscribe(
        (customer: Customer) => {
          this.loggedInCustomer = customer;
  
          this.feedbackForm.patchValue({
            name: this.loggedInCustomer.userName,
            email: this.loggedInCustomer.userEmail,
          });
        },
        (error) => {
          console.error('Error fetching customer data:', error);
        }
      )
    }
   
  }

