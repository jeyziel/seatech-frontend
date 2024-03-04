import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/core/shared/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  closeResult: string = '';
  public addUsersForm: FormGroup;
  public editUsersForm: FormGroup;
  public users: any[];

  public submittedUser: Boolean;
  public successUser: Boolean;

  public userSelected: any;

  fn: any;
  paramsDelete: any;

  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private userService: UserService
  ) { }


  ngOnInit(): void {

    this.addUsersForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
      password_confirmation: new FormControl(null, [Validators.required]),
    },  this.matchPassword)

    this.editUsersForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
    })

    this.getUsers();
  }

  get addForm() {
    return this.addUsersForm.controls
  }

  get editForm() {
    return this.editUsersForm.controls
  }

  open(content: any, fn = null, ...params: any[]) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', 'centered': true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

    //delete params
    this.fn = fn;
    this.paramsDelete = params;
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


  create() {
    this.submittedUser = true
    this.successUser = false;

    if (this.addUsersForm.invalid)
      return;


    const data = this.addUsersForm.value


    this.userService.create(data)
      .subscribe({
        next: (resUser: any[]) => {

          this.toastr.success("Usuário Cadastrado com sucesso", "Usuários");


          this.modalService.dismissAll()

        },
        error: err => {

          this.toastr.error("Falha ao cadastrar Usuários", "Usuários")

        } 
      })
    


  }

  onEditUser(user: any) {
    this.editUsersForm.controls['name'].setValue(user.name)
    this.editUsersForm.controls['email'].setValue(user.email)

    this.userSelected = user
  }

  update() {
    this.submittedUser = true
    this.successUser = false;

    if (this.editUsersForm.invalid)
      return;

    const data = this.editUsersForm.value
    const id = this.userSelected?.id

    this.userService.update(id, data)
      .subscribe({
        next: resUser => {


          this.toastr.success("Usuário Atualizado com sucesso", "Atualizar Usuário")

          this.getUsers()

        },
        error: err => {
          this.toastr.error("Falha ao atualizar usuário", "Atualizar Usuário")
        }
      })


  }

  setUserSelected(user: any) {
    this.userSelected = user
  }

  removerUser(id: Number) {

  }

  getUsers() {
    
    this.userService.list()
      .subscribe({
        next : (resUser: any[]) => {


          this.users = resUser

          
        },
        error: err => {

          this.toastr.error("Falha ao buscar Usuários", "Usuários")

        }
      })


  }

  confirmationDelete() {
    this.fn(...this.paramsDelete);
  }

  private getDismissReason(reason: any): string {

    this.successUser = false;
    this.submittedUser = false;


    this.addUsersForm.reset()
    this.addUsersForm.setErrors(null)

    this.editUsersForm.reset()
    this.editUsersForm.setErrors(null)

    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


}
