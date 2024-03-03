import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ranking-surveys-customers',
  templateUrl: './ranking-surveys.component.html',
  styleUrls: ['./ranking-surveys.component.css']
})
export class RankingSurveysCustomerComponent {


  @Input() surveys;

}
