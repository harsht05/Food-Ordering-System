import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../../services/admin.service';
import { Restaurant } from '../../../models/restaurant';
import Swal from 'sweetalert2';
import { SessionStorageService } from '../../../services/session-storage.service';

@Component({
  selector: 'app-view-all-restaurants',
  templateUrl: './view-all-restaurants.component.html',
  styleUrl: './view-all-restaurants.component.css',
})
export class ViewAllRestaurantsComponent {
  constructor(private route: Router, private adminService: AdminService, private sessionStorageService: SessionStorageService) {}
  showrest: Restaurant[] = [];
  resStartIdx = 0;
  resEndIdx = 4; 
  totalRes = 0;
  currRest:Restaurant[]=[];

  ngOnInit(): void {

    if(!this.sessionStorageService.getItem("isAdmin")) {

      this.route.navigate(['accessDenied']);
    }

    this.loadRestaurants();
  }

  loadRestaurants(): void {
    this.adminService.getAllRestaurants().subscribe((response) => {
      this.showrest = response;
      this.totalRes = this.showrest.length;
      this.loadRest();
      console.log(this.showrest);
    });
  }
  deleteHandler = (restId: number) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this restaurant!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.deleteRestaurantById(restId).subscribe(
          (response) => {
            console.log("DELETED "+response);
            
            this.showrest=this.showrest.filter(rest=>{
              return rest.userId===restId;
            })
            Swal.fire(
              'Deleted!',
              'Your restaurant has been deleted.',
              'success'
            );

             
          },
         
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your restaurant is safe :)',
          'info'
        );
      }
    });
  };
  
  
  viewHandler(restId: number): void {
    this.route.navigate(['/restaurant/dashboard', restId]);   
  }
  prev() {
    if (this.resStartIdx > 0) {
      this.resEndIdx = this.resStartIdx - 1;
      this.resStartIdx -= 8;
      this.loadRest();
    }
  }

  next() {
    if (this.resEndIdx + 8 < this.totalRes) {
      this.resStartIdx = this.resEndIdx + 1;
      this.resEndIdx += 8;
    } else if (this.resEndIdx < this.totalRes) {
      this.resStartIdx = this.resEndIdx + 1;
      this.resEndIdx = this.totalRes - 1;
    }
    this.loadRest();
  }

  loadRest() {
    if (this.resStartIdx >= 0 && this.resEndIdx < this.totalRes && this.resStartIdx <= this.resEndIdx) {
      this.currRest = this.showrest.slice(this.resStartIdx, this.resEndIdx + 1);
    } else {
      console.error('Invalid index range or indices.');
    }
  }

}
