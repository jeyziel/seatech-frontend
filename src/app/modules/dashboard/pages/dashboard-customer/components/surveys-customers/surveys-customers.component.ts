import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-surveys-customers',
  templateUrl: './surveys-customers.component.html',
  styleUrls: ['./surveys-customers.component.css']
})
export class SurveysCustomerComponent {

  @Input() surveys;


}
