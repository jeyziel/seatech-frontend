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




    console.log(this.surveyHabors)


    const labels = this.surveyHabors.map(obj => obj.harbor_name.toLowerCase());
    const surveys = this.surveyHabors.flatMap(obj => obj.surveys);
    const uniqueSurveys = Array.from(new Set(surveys.map(survey => survey.name)));

    const datasets = uniqueSurveys.map(surveyName => {
        const data = this.surveyHabors.map(porto => {
            const survey = porto.surveys.find(survey => survey.name === surveyName);
            return survey ? survey.price : 0;
        });
        
        return {
            data,
            label: surveyName,
            stack: 'a'
        };
    });

  
    this.barChartData.labels = labels
    this.barChartData.datasets = datasets


  }
  

}
