import { HttpClient, HttpHeaders } from '@angular/common/http';
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

    var headers = new HttpHeaders();
    headers = headers.set('skip_interceptor', 'true');

   

    return this.http.post(`${environment.api_url}/auth/login`, params, {headers: headers})

  }

  logout(params) {

    return this.http.post(`${environment.api_url}/auth/logout`, params)

  }

  refresh(params) {

    return this.http.post(`${environment.api_url}/refresh`, params)

  }


  public add(data) {
    
    
    localStorage.setItem('user', JSON.stringify(data.user))
    localStorage.setItem('token', data.access_token)

  }

  public get(key) {

    return localStorage.getItem(key)
  }

  public isLoggedIn() {

    const tokenExists = this.get('token') ?  true :  false
    return tokenExists

  }

  public remove(){
    localStorage.clear();
  }



}
