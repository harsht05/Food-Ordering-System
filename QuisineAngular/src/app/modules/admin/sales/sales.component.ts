import { Component, AfterViewInit } from '@angular/core';
import { SessionStorageService } from '../../../services/session-storage.service';
import { Router } from '@angular/router';
import { AdminService } from '../../../services/admin.service';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent {

  label:any=[]
  mydata:any=[]
  constructor(private sessionStorageService: SessionStorageService, private route: Router, private adminService: AdminService) {
    Chart.register(...registerables); // Register necessary components of Chart.js
  }
// ngOnInit(){
//   this.createChart(countsByExperience);
// }
  ngOnInit() {
    this.adminService.getOrdersByDate().subscribe(response => {
      const countsByExperience = response;
      console.log(countsByExperience + "ORDERSSSSSS");
      console.log(countsByExperience);
      this.createChart(countsByExperience);
    ;
    });
  }

  createChart(countsByExperience: any[]) {
    // if ('myChart1') {
    //   console.error("Chart canvas element is not available.");
    //   return;
    // }
    console.log(countsByExperience);
    countsByExperience.forEach(data=>{
      console.log(data);
      this.label.push(data[0])
      this.mydata.push(data[1]);
      
    })
    

    new Chart('myChart1', {
      type: 'line',
      data: {
        labels: this.label,
        datasets: [{
          label: 'Order Counts',
          data: this.mydata,
          borderColor: 'blue',
          backgroundColor: 'rgba(0, 0, 255, 0.1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
