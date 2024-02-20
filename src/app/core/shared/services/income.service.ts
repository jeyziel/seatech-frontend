import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiHandlerService } from 'src/app/core/shared/utils/api-handler.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  constructor(
    private http: HttpClient
  ){}

  create(params) {


    return this.http.post(`${environment.api_url}/incomes`, params)
  }

  update(id: Number, params) {

    return this.http.put(`${environment.api_url}/incomes/${id}`, params)

  }

  confirmPayment(id: Number, params) {

    return this.http.post(`${environment.api_url}/incomes/${id}/confirm-payment`, params)

  }

  show(id: Number) {

    return this.http.get(`${environment.api_url}/incomes`)

  }

  delete(id: Number) {

    return this.http.delete(`${environment.api_url}/incomes/${id}`)

  }

  list() {

    return this.http.get(`${environment.api_url}/incomes`)

  }



}
