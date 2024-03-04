import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiHandlerService } from 'src/app/core/shared/utils/api-handler.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AtendimentoService {

  constructor(
    private http: HttpClient
  ){}

  create(params) {


    return this.http.post(`${environment.api_url}/services`, params)
  }

  update(id: Number, params) {

    return this.http.put(`${environment.api_url}/services/${id}`, params)

  }

  show(id: Number) {

    return this.http.get(`${environment.api_url}/services/${id}`)

  }

  delete(id: Number) {

    return this.http.delete(`${environment.api_url}/services/${id}`)

  }

  list() {

    return this.http.get(`${environment.api_url}/services`)

  }

  listByStatus(status = 'CONCLUDED') {

    return this.http.get(`${environment.api_url}/services`)

  }



}
