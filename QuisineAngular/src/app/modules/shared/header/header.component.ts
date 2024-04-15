import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionStorageService } from '../../../services/session-storage.service';
import { UserService } from '../../../services/user.service';
import { CustomerService } from '../../../services/customer.service';
import { Customer } from '../../../models/customer';
import Swal from 'sweetalert2';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  showSearchResults: boolean = false;
  searchInput: string = ''; 
  isUpdateMode: boolean = false;

  @ViewChild(SearchComponent) searchComponent!: SearchComponent;

  toggleUpdateMode(): void {
    this.isUpdateMode = !this.isUpdateMode;
  }

  onInputChange() {
    this.searchComponent.onInputChange();
  }

  constructor(private sessionStorageService: SessionStorageService, private custService: CustomerService, private userService: UserService, private route: Router) {}

  isLoggedIn(): boolean {
    
    return this.sessionStorageService.getItem('custId') !== null;
  }

  onSearchClick(query:string){
    
    document.getElementById("queryInput")
    this.route.navigate(['customers/search/'],{queryParams:{query:query}})
  }
  

  customerId: number = 0;
  customer: Customer = new Customer();
  imageUrl: string = "";
  userImage:string = '';
  cities:string[] = [];
  
  user = new FormGroup({
    userName: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z]{3,}$/)]),
    userEmail: new FormControl(''),
    userContact: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.maxLength(10), Validators.minLength(10)]),
    userPass: new FormControl(''),
    userImg: new FormControl(''),
    userAddress: new FormControl('', [Validators.required, Validators.minLength(8)]),
    userCity: new FormControl('', [Validators.required, Validators.minLength(3)]),
    userState: new FormControl(''),
    userPin: new FormControl(0, [Validators.required, Validators.pattern('[0-9]+'), Validators.minLength(6), Validators.maxLength(6)])
  });

  

  ngOnInit() {

    this.custService.getCities().subscribe(response => {
      
      this.cities = response;      
    });

    const cid = this.sessionStorageService.getItem("custId");

    if(cid !== null) {

      this.customerId = cid;

      this.userService.getCustomerById(this.customerId).subscribe(response => {

        this.customer = response;
        console.log(response);
        
        this.imageUrl = "assets/images/" + this.customer.userImg;
        console.log(this.imageUrl);
        
  
        this.user.patchValue({
          userName: this.customer.userName,
          userEmail: this.customer.userEmail,
          userContact: this.customer.userContact,
          userPass: this.customer.userPass,
          userAddress: this.customer.userAddress,
          userCity: this.customer.userCity,
          userState: this.customer.userState,
          userPin: this.customer.userPin
        });

        this.userImage = this.customer.userImg;
      });
    }
  }

  cityRestaurants(city:string) {

    this.sessionStorageService.setItem("city", city);
    window.location.href = `/cityRestaurants`;
  }

  updateCustomer() {
    
    Swal.fire({
      title: 'Are you sure want to Update Profile?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Update Profile!',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {

        if(this.user.value.userImg !== '') {

          this.userImage = this.user.value.userImg?.substring(12)!;
        }
        this.custService.updateCustomer(new Customer(this.customerId, this.user.value.userName!, this.user.value.userEmail!, this.user.value.userPass!, this.userImage, this.user.value.userContact!, this.user.value.userAddress!, this.user.value.userCity!, this.customer.userState, this.user.value.userPin!, "customer")).subscribe(response => {
        });

        Swal.fire(
          'Profile Updated Successfully!',
          '',
          'success'
        ).then((result) => {

          if(result.value) {

            window.location.reload();
          }
        });
      } 
    })
  }

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

  logout() {

    Swal.fire({
      title: 'Are you sure want to Logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Logout!',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Logout Successfully!',
          '',
          'success'
        )
        this.route.navigate([`/customer/logout`]);
      } 
    })
  }
}
