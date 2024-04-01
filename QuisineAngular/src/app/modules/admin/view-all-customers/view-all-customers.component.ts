import { ChangeDetectorRef, Component } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { Router } from '@angular/router';
import { Customer } from '../../../models/customer';
import Swal from 'sweetalert2';
import { SessionStorageService } from '../../../services/session-storage.service';

@Component({
  selector: 'app-view-all-customers',
  templateUrl: './view-all-customers.component.html',
  styleUrl: './view-all-customers.component.css'
})
export class ViewAllCustomersComponent {
  constructor(private adminService:AdminService,private route:Router, private sessionStorageService: SessionStorageService){

  }

  customer:Customer[] = [];

  ngOnInit() {

    if(!this.sessionStorageService.getItem("isAdmin")) {

      this.route.navigate(['accessDenied']);
    }


    this.adminService.getAllCustomers().subscribe(response => {
      this.customer = response;
      console.log(this.customer);
    });
}
deleteHandler=(custId:number)=>{
  Swal.fire({
    title: 'Are you sure?',
    text: 'You will not be able to recover this customer!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, keep it'
  }).then((result) => {
    if (result.isConfirmed) {
      this.adminService.deleteCustomerById(custId).subscribe(
        (response) => {
          console.log("DELETED "+response);
          this.customer=this.customer.filter(cust=>{
            return cust.userId===custId;
          })
          Swal.fire(
            'Deleted!',
            'Your Customer has been deleted.',
            'success'
          );           
        },
       
      );
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire(
        'Cancelled',
        'Your Customer is safe :)',
        'info'
      );
    }
  });
}
}
