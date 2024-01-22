import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-elderly-check',
  templateUrl: './elderly-check.component.html',
  styleUrls: ['./elderly-check.component.css']
})
export class ElderlyCheckComponent implements OnInit {
  @ViewChild('pieChart') pieChart: ElementRef;
  @ViewChild('barChart') barChart: ElementRef;
  elderlies: any[] = [];
  displayedColumns: string[] = ['ID', 'name', 'surname', 'age', 'present', 'Bodytemperature'];
  chartData: any[] = [];
  temperatureData: any[] = [];

  constructor(private http: HttpClient) { }
   // Make an HTTP GET request to fetch data from MongoDB
  ngOnInit(): void {

    this.http.get<any[]>('http://localhost:3000/api/elderlies').subscribe(data => {
      this.elderlies = data;
    });

    this.http.get<any[]>('http://localhost:3000/api/bar').subscribe(data => {
      this.temperatureData = data;
      this.drawBarChart();
        });


    this.http.get<any[]>('http://localhost:3000/api/chart').subscribe(data => {
      this.chartData = data;
      this.drawPieChart();
    });
  }
  //method to handle the PieChart
  drawPieChart() {
    if (this.pieChart) {
      const presentYesCount = this.chartData.filter(item => item.present === 'Yes').length;
      const presentNoCount = this.chartData.filter(item => item.present === 'No').length;

      const ctx = this.pieChart.nativeElement.getContext('2d');

      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Yes', 'No'],
          datasets: [
            {
              data: [presentYesCount, presentNoCount],
              backgroundColor: ['#007ACC', 'red'], // Customize the colors
            },
          ],
        },
      });
    }
  }
 //Method for the BarChart
  drawBarChart() {
        if (this.barChart) {
          const ctx = this.barChart.nativeElement.getContext('2d');

          const names = this.temperatureData.map(item => item.name);
          const temperatures = this.temperatureData.map(item => item.Bodytemperature);
          const backgroundColors = temperatures.map(temp => (temp > 27.9 ? 'red' : '#007ACC'));

          new Chart(ctx, {
            type: 'bar',
            data: {
              labels: names,
              datasets: [
                {
                  label: 'Body Temperature',
                  data: temperatures,
                  backgroundColor: backgroundColors,
                  borderColor: 'white',
                  borderWidth: 4
                }
              ]
            },
            options: {
              scales: {
                x: {
                  title: {
                    display: true,
                    text: 'Names'
                  }
                },
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: 'Body Temperature',

                  }
                }
              }
            }
          });
        }
  }
}
