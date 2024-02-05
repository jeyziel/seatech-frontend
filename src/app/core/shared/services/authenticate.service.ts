import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiHandlerService } from 'src/app/core/shared/utils/api-handler.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(
    private http: HttpClient
  ){}

  login(params) {

    console.log("meus params", params)

    return this.http.post(`${environment.api_url}/auth/login`, params)

  }

  logout(params) {

    this.http.post(`${environment.api_url}/logout`, params)

  }

  refresh(params) {

    this.http.post(`${environment.api_url}/refresh`, params)

  }



}
