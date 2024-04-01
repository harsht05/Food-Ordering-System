import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import Chart from 'chart.js/auto';
import { SessionStorageService } from '../../../services/session-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements AfterViewInit, OnDestroy {
  private ctx: any;
  chartData: any;

  constructor(private sessionStorageService: SessionStorageService, private route: Router) {}

  ngOnInit(){

    if(!this.sessionStorageService.getItem("isAdmin")) {

      this.route.navigate(['accessDenied']);
    }
  }

  ngAfterViewInit() {
    this.ctx = document.getElementById('myChart1') as HTMLCanvasElement | null;
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
    const myChart = new Chart(this.ctx!, {
      type: 'line',
      data: {
        labels: ['29/03', '30/03', '31/03', '01/04', '02/04', '03/04'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1,
          
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
  }
}