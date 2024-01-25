import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceRoutingModule } from './surveys-routing.module';
import { SurveysComponent } from './surveys.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    SurveysComponent,
    
  ],
  imports: [
    NgbModalModule,
    CommonModule,
  
    InvoiceRoutingModule
  ]
})
export class SurveyModule { }
