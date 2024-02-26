import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ranking-atendimentos',
  templateUrl: './ranking-atendimentos.component.html',
  styleUrls: ['./ranking-atendimentos.component.css']
})
export class RankingAtendimentosComponent {


  @Input() services: any[] = []


}
