import { Component } from '@angular/core';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-chart-categories-expenses',
  templateUrl: './chart-categories-expenses.component.html',
  styleUrls: ['./chart-categories-expenses.component.css']
})
export class ChartCategoriesExpensesComponent {


  title = 'ng2-charts-demo';

  public doughnutChartLabels: string[] = [ 'Salário e ordenados', 'Equipamentos', 'Agua', 'Luz' ];
  public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] = [
      { data: [ 650, 450, 450, 450], label: 'Series A' },
    ];

  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
  };

  constructor() {
  }


}
