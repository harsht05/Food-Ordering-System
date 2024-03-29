import { Component } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { Router } from '@angular/router';
import { Customer } from '../../../models/customer';

@Component({
  selector: 'app-view-all-customers',
  templateUrl: './view-all-customers.component.html',
  styleUrl: './view-all-customers.component.css'
})
export class ViewAllCustomersComponent {
  constructor(private adminService:AdminService,private route:Router){

  }

  customer:Customer[] = [];

  ngOnInit() {
    this.adminService.getAllCustomers().subscribe(response => {
      this.customer = response;
      console.log(this.customer);
    });
}}