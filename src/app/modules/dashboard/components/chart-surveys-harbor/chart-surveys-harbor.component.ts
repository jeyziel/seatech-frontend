import { Component } from '@angular/core';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-chart-surveys-harbor',
  templateUrl: './chart-surveys-harbor.component.html',
  styleUrls: ['./chart-surveys-harbor.component.css']
})
export class ChartSurveysHarborComponent {

   title = 'ng2-charts-demo';

  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [ 'Salvador', 'Candeias', 'Vitória' ],
    datasets: [
      { data: [ 65, 59, 80 ], label: 'IRON ORE FINES', stack: 'a' },
      { data: [ 28, 48, 40 ], label: 'OFF HIRE BUNKER', stack: 'a' }
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
  };

  constructor() {
  }
  

}
