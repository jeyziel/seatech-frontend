import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiHandlerService } from 'src/app/core/shared/utils/api-handler.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChargeService {

  constructor(
    private http: HttpClient
  ){}


  create(idIncome: Number, params) {

    console.log("parametros", params)

    return this.http.post(`${environment.api_url}/incomes/${idIncome}/service-survey`, params)
  }

 
  list(idIncome: Number) {
    return this.http.get(`${environment.api_url}/incomes/${idIncome}/service-survey`)
  }

  delete(idIncome: Number, idServiceSurvey) {
    return this.http.delete(`${environment.api_url}/incomes/${idIncome}/service-survey/${idServiceSurvey}`)
  }



  


}