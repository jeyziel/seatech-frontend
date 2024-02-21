
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AuthenticateService } from 'src/app/core/shared/services/authenticate.service';

@Injectable({
  providedIn: 'root'
})
export class authGuard  {
  constructor(private router: Router, private authService: AuthenticateService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    return true;
    if (this.authService.isLoggedIn()) {
      return true
   }

   this.router.navigate(['/login'])
   return false
  }
}
