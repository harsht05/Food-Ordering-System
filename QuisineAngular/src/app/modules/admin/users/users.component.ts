import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import Chart from 'chart.js/auto';
import { FeedbackService } from '../../../services/feedback.service';
import { SessionStorageService } from '../../../services/session-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements AfterViewInit, OnDestroy {
  private ctx: any;
  chartData: any;

  constructor(private feedbackService:FeedbackService, private sessionStorageService: SessionStorageService, private route: Router) {}

  ngOnInit() {

    if(!this.sessionStorageService.getItem("isAdmin")) {

      this.route.navigate(['accessDenied']);
    }
  }

  ngAfterViewInit() {
    this.ctx = document.getElementById('myChart') as HTMLCanvasElement | null;
    if (this.ctx) {
      this.renderChart();
    }
  }

  ngOnDestroy() {
    if (this.chartData) {
      this.chartData.destroy();
    }
  }

  private renderChart(): void {
    this.feedbackService.getCountsByExperience().subscribe(response=>{
      console.log(response);
      

      const myChart = new Chart(this.ctx!, {
        type: 'bar',
        data: {
          labels: ['Excellent', 'Good', 'Average', 'Poor', 'Very Bad'],
          datasets: [{
            label: 'No. of Feedbacks',
            data: [response[0], response[1],response[2], response[3],response[4]],
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
  
      this.chartData = myChart;


    });
   
    
    
  }
}
