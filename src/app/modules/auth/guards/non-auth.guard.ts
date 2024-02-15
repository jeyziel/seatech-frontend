
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticateService } from 'src/app/core/shared/services/authenticate.service';

@Injectable({
  providedIn: 'root'
})
export class NonAuthGuard  {
  constructor(private router: Router, private authService: AuthenticateService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    if (this.authService.isLoggedIn()) {

      this.router.navigate(['/dashboard'])

      return false

   }

   return true

  }
}
