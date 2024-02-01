import { Injectable } from '@angular/core';
import getBrowserFingerprint from 'get-browser-fingerprint';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Observable, catchError, finalize, throwError, from, lastValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { GlobalService } from '../global.service';
import { Router } from '@angular/router';
import { AuthenticateService } from '../services/authenticate.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router, private authService: AuthenticateService) { }

  intercept( request: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {


    const skipInterceptor = request.headers.get("skip_interceptor")

    if (! Boolean(skipInterceptor)){

      const token = this.authService.get('token')
  
      request = request.clone({
          setHeaders: {
              Authorization: 'Bearer ' + token
          }
      });

    }


    

    return next.handle(request);

}

  


}
