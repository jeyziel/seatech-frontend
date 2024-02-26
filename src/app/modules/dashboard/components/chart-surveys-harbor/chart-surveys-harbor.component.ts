import { Component, Input } from '@angular/core';
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

  public datasets: any[] = [
    {data: [], label: '', stack: 'a'}
  ]

  @Input() surveyHabors: any[] = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
  };

  constructor() {
  }

  ngOnInit() {

    this.getIncomeByHarbors()


  }


  getIncomeByHarbors() {


    const labels = []
    const datasets = []


    this.surveyHabors.forEach(porto => {
      // Adicionando o nome do porto aos rótulos
      labels.push(porto.harbor_name);
    
      // Iterando sobre as pesquisas do porto
      porto.surveys.forEach(survey => {
        // Verificando se o conjunto de dados para esta pesquisa já existe
        const existingDatasetIndex = datasets.findIndex(dataset => dataset.label === survey.name);
        if (existingDatasetIndex !== -1) {
          // Se o conjunto de dados já existe, adiciona o preço multiplicado pela quantidade
          datasets[existingDatasetIndex].data.push(survey.price);
        } else {
          // Se o conjunto de dados não existe, cria um novo
          datasets.push({
            data: [survey.price],
            label: survey.name,
            stack: 'a'
          });
        }
      });
    });
    


    this.barChartData.labels = labels
    this.barChartData.datasets = datasets


  }
  

}
