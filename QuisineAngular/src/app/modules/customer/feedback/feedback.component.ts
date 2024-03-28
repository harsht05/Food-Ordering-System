import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css'
})
export class FeedbackComponent {

  feedbackForm!: FormGroup;

  constructor(private fb: FormBuilder,private route:Router) { }

  ngOnInit(): void {
    this.feedbackForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      description: ['', Validators.required],
      like: ['', Validators.required],
      recommend: ['', Validators.required]
    });

    // You might want to initialize form values here
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
    // You can initialize form values here
    this.feedbackForm.patchValue({
      name: 'John Doe', // Example name
      email: 'john@example.com', // Example email
    });
  }
}
