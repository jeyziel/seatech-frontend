import { Component } from '@angular/core';
import { ChartConfiguration, ChartDataset, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-chart-categories',
  templateUrl: './chart-categories.component.html',
  styleUrls: ['./chart-categories.component.css']
})
export class ChartCategoriesComponent {


  title = 'ng2-charts-demo';

  public doughnutChartLabels: string[] = [ 'Vistórias', 'Investimentos' ];
  public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] = [
      { data: [ 350, 450], label: 'Series A' },
    ];

  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
  };

  constructor() {
  }
}
