import { Component } from '@angular/core';
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
    });
}
deleteHandler = (custId: number, cust: Customer) => {
  const action = cust.isBlocked ? 'unblock' : 'block';
  const confirmationMessage = cust.isBlocked ? 'unblock this customer' : 'block this customer';
  const successMessage = cust.isBlocked ? 'unblocked' : 'blocked';
  
  Swal.fire({
    title: `Are you sure you want to ${action} this customer?`,
    text: cust.isBlocked ? 'You will be unblocking this customer.' : 'You will be blocking this customer.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: `Yes, ${action} it!`,
    cancelButtonText: 'No, keep it',
  }).then((result) => {
    if (result.isConfirmed) {
      this.adminService.deleteCustomerById(custId, !cust.isBlocked).subscribe((response) => {
        cust.isBlocked = !cust.isBlocked;
        Swal.fire(
          `${action.charAt(0).toUpperCase() + action.slice(1)}!`,
          `Your customer has been ${successMessage}.`,
          'success'
        );
      });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire('Cancelled', 'Your action has been cancelled.', 'info');
    }
  });
};


}
