import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../../shared/services/authenticate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit {

  constructor(private authService: AuthenticateService, private router: Router) { }

  ngOnInit(): void {
  }

  logout(){
    
    this.authService.logout({})
      .subscribe({
        next: resLogout => {

          localStorage.removeItem('user')
          localStorage.removeItem('token')

          this.router.navigate(['/login'])


        },
        error: err => {
          localStorage.removeItem('user')
          localStorage.removeItem('token')

          this.router.navigate(['/login'])

        }
      })


  }

}
