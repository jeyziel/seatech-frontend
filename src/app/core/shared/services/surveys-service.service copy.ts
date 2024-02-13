import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiHandlerService } from 'src/app/core/shared/utils/api-handler.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpenseServiceService {

  constructor(
    private http: HttpClient
  ){}

  create(idService, params) {


    return this.http.post(`${environment.api_url}/services/${idService}/expenses`, params)
  }

  update(idService: Number, idExpense: Number, params) {

    return this.http.put(`${environment.api_url}/services/${idService}/expenses/${idExpense}`, params)

  }

  show(idService: Number) {

    return this.http.get(`${environment.api_url}/services/${idService}/expenses`)

  }

  delete(idService: Number, idExpense: Number) {

    return this.http.delete(`${environment.api_url}/services/${idService}/expenses/${idExpense}`)

  }

  list() {

    return this.http.get(`${environment.api_url}/services`)

  }



}
