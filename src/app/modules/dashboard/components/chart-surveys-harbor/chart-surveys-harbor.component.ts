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
    labels: [ '2006', '2007', '2008', '2009', '2010', '2011', '2012' ],
    datasets: [
      { data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'Series A', stack: 'a' },
      { data: [ 28, 48, 40, 19, 86, 27, 90 ], label: 'Series B', stack: 'a' }
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
  };

  constructor() {
  }
  

}
