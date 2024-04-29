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
    Chart.register(...registerables); 
  }

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
  
    countsByExperience.forEach(data=>{
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
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)'
          ],
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
