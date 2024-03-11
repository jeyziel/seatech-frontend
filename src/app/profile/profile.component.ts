import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../core/shared/services/authenticate.service';
import { ToastrService } from 'ngx-toastr';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  public profile: any

  public addUsersForm: FormGroup;

  public submittedUser: Boolean
  public successUser: Boolean;



  constructor(private authService: AuthenticateService, private toastr: ToastrService) { }

  ngOnInit(): void {

   

    this.addUsersForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      updatePassword: new FormControl(false, [Validators.nullValidator]),
      password: new FormControl(null, [Validators.nullValidator]),
      password_confirmation: new FormControl(null, [Validators.nullValidator]),
    },  this.matchPassword)

    this.getProfile()

  }

  get addForm() {
    return this.addUsersForm.controls
  }


  getProfile() {

    this.authService.profile()
      .subscribe({
        next: (resProfile: any) => {
          this.profile = resProfile
          this.populateForm()

          console.log("meu perfil", this.profile)
        },
        error: err => {
          this.toastr.error("Falha ao obter as informações do usuário", "Meu perfil")
        }
      })

  }

  populateForm(){


    this.addUsersForm.controls["name"].setValue(this.profile?.name)
    this.addUsersForm.controls["email"].setValue(this.profile?.email)


  }

  private matchPassword(AC: AbstractControl) {
    let password = AC.get('password').value;
    if (AC.get('password_confirmation').touched || AC.get('password_confirmation').dirty) {
      let verifyPassword = AC.get('password_confirmation').value;
      if (password != verifyPassword) {
        AC.get('password_confirmation').setErrors({ matchPassword: true });
      } else {
        return null;
      }
    }
  }


  update() {
    this.submittedUser = true
    this.successUser = false;

    const invalid = [undefined, null, '', 'null'];
    

   


    if (this.addUsersForm.invalid)
      return;

    const data = this.addUsersForm.value


    for (const key in data) {
      if (invalid.includes(data?.[key])) {
        delete data[key];
      }


    }

    this.authService.saveProfile(data)
      .subscribe({
        next: resUser => {


          this.toastr.success("Perfil Atualizado com sucesso", "Meu Perfil")

   
        },
        error: err => {
          this.toastr.error("Falha ao atualizar Perfil", "Meu Perfil")
        }
      })


  }

}
