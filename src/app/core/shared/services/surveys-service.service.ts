import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiHandlerService } from 'src/app/core/shared/utils/api-handler.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SurveyServiceService {

  constructor(
    private http: HttpClient
  ){}

  create(idService, params) {


    return this.http.post(`${environment.api_url}/services/${idService}/surveys`, params)
  }

  update(idService: Number, params) {

    return this.http.put(`${environment.api_url}/services/${idService}/surveys`, params)

  }

  show(idService: Number) {

    return this.http.get(`${environment.api_url}/services/${idService}/surveys`)

  }

  delete(idService: Number, idServiceSurvey: Number) {

    return this.http.delete(`${environment.api_url}/service-survey/${idServiceSurvey}`)

  }

  list() {

    return this.http.get(`${environment.api_url}/services`)

  }



}
