import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ranking-customers',
  templateUrl: './ranking-customers.component.html',
  styleUrls: ['./ranking-customers.component.css']
})
export class RankingCustomersComponent {


  @Input() customers: any[];
  @Input() faturamento: number = 0;

  constructor() {}

  ngOnInit(){

  }


  getContribuicao(value: number) {

    const contribuicao =  (value / this.faturamento) * 100

    return contribuicao.toFixed(2)

  }

}
