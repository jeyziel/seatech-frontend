import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiHandlerService } from 'src/app/core/shared/utils/api-handler.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private http: HttpClient
  ){}

  create(params) {


    return this.http.post(`${environment.api_url}/accounts`, params)
  }

  update(id: Number, params) {

    return this.http.put(`${environment.api_url}/accounts/${id}`, params)

  }

  show(id: Number) {

    return this.http.get(`${environment.api_url}/accounts`)

  }

  delete(id: Number) {

    return this.http.delete(`${environment.api_url}/accounts/${id}`)

  }

  list() {

    return this.http.get(`${environment.api_url}/accounts`)

  }



}
