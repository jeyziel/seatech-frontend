import { Component, Input } from '@angular/core';
import { ChartConfiguration, ChartDataset, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-chart-categories-customers',
  templateUrl: './chart-categories.component.html',
  styleUrls: ['./chart-categories.component.css']
})
export class ChartCategoriesCustomerComponent {


  @Input() categories = [];
  @Input() title = '';

  public values: any[] = []


  public doughnutChartLabels: string[] = [];
  public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] = [
      { data: []},
    ];



  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
  };

  constructor() {

    
  }

  ngOnInit() {

  

    const data =  this.extrairDados(this.categories)

    console.log("data", data)

    this.doughnutChartLabels = data.names

    this.doughnutChartDatasets[0].data = data.values


    //this.values = data.values
    
 
  



  }

  extrairDados(array: any) {

    const names = [];
    const values = [];

    array.forEach(obj => {
      names.push(obj.category_name);
      values.push(obj.total_value);
    });

    return { names, values } ;
  }
}
