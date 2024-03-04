import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SocketService } from 'src/app/core/shared/socket.service';
import {AuthService} from '../services/auth.service'
import { navItems } from 'src/app/core/default-layout/_nav';
import { AuthenticateService } from 'src/app/core/shared/services/authenticate.service';
import { param } from 'jquery';
import { Token } from '@angular/compiler';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public navItems = navItems;
  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
  });
  isError: boolean = false;

  public submitted : Boolean = false
  public success: Boolean = false

  public wrongLogin: Boolean = false

  constructor(
    private authService : AuthenticateService, 
    private router: Router, private socket: SocketService,
    private toastrService : ToastrService
  ) { }


  login(){

    this.submitted = true
  


    if (!this.loginForm.valid) {
      this.success = false
      return;
    }

    const credentials = this.loginForm.value 

    this.authService.login(credentials)
      .subscribe({
        next: (res : any) => {

          localStorage.setItem('token', res?.access_token)
          localStorage.setItem('username', res?.user?.name)

          this.submitted = true
          this.success = true

          this.toastrService.success(`Seja bem vindo(a) ${res?.user?.name} `, "Bem vindo!")

          this.router.navigate(['/dashboard'])

        },
        error: err => {
          console.log("Falha ao realizar Login", err)

          this.submitted = true
          this.success = false

          this.wrongLogin = true
        }
      })


  }

  get f() {
    return this.loginForm.controls
  }

  onSingIn(){
    this.router.navigate(['/dashboard']);
  }
  moveToForgetPassword(){
    this.router.navigate(['reset-password']);
  }
}
