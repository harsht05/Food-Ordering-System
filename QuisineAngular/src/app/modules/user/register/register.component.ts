import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { FormControl, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { SessionStorageService } from '../../../services/session-storage.service';
import { User } from '../../../models/user';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  
  customer:boolean=false;
  restaurant:boolean=false;
  role:string='';

  ngOnInit() {

    this.user.patchValue({
      userEmail: this.sessionStorage.getItem("newUserEmail")
    });

    Swal.fire({
      title: 'Your Email is verified Successfully!!',
      text: 'Who are you?',
      icon: 'question',
      showCancelButton: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      confirmButtonText: 'Customer',
      cancelButtonText: 'Restaurant'
    }).then((result) => {
      if (result.value) {
        this.customer = true;
        this.role = 'customer';
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.restaurant = true;
        this.role = 'restaurant';
      }
    });
    
  }

  clickOnCustomer() {

    this.customer = true;
    this.role = 'customer';
  }

  clickOnRestaurant() {

    this.restaurant = true;
    this.role = 'restaurant';
  }

  constructor(private service: UserService, private sessionStorage: SessionStorageService, private router: Router) {}

  user = new FormGroup(
    {
     "userName": new FormControl("", [Validators.required]),
      "userEmail":new FormControl("",[Validators.required,Validators.pattern('^[a-zA-Z0-9._%+-]+@gmail\.com$')]),
      "userPass": new FormControl("", [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/)]),
      "userImg": new FormControl("", [Validators.required]),
      "restOwnerName": new FormControl(""),
      "confirmPassword": new FormControl("", [Validators.required]),
      "userAddress": new FormControl("", [Validators.required, Validators.minLength(8)]),
      "userContact": new FormControl("", [ Validators.required,  Validators.pattern(/^(?!1|2|3)\d{10}$/),
        Validators.minLength(10), 
        Validators.maxLength(10)]),
      
      "userPin": new FormControl("", [Validators.required, Validators.pattern('[0-9]+'), Validators.minLength(6), Validators.maxLength(6)]),
      "userCity": new FormControl("", [Validators.required]),
      "userState": new FormControl("", [Validators.required]),
      "agree": new FormControl(false, Validators.requiredTrue)
    }, { validators: this.passwordMatchValidator }
  );

  passwordMatchValidator(control: AbstractControl): { [key: string]: any } | null {
    const password = control.get('userPass');
    const confirmPassword = control.get('confirmPassword');

    if (!password || !confirmPassword) {
      return null;
    }

    if (password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      confirmPassword.setErrors(null); 
      return null;
    }
  }
  
   addUser() {
    const formData = this.user.value;
    console.log('Registration form data:', formData);

    this.service.addUser(new User(0, formData.userName!, formData.userEmail!, formData.userPass!, formData.userImg?.substring(12)!, formData.restOwnerName!, formData.userContact!, formData.userAddress!, formData.userCity!, formData.userState!, Number(formData.userPin!), this.role)).subscribe(
      (response) => {
        console.log('User registered successfully:', response);

        Swal.fire(
          'User registered Successfully!!',
          '',
          'success'
        );
        this.router.navigate(['']);
      }
    );
}

imageUrl: string = "";

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    
    if (file) {
      
      const reader = new FileReader();
      reader.onload = (e: any) => {
        
        this.imageUrl = e.target.result;
      };

      reader.readAsDataURL(file);
    }
  }

}

