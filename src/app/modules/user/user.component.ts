import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
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
    private toastr: ToastrService
  ) { }


  ngOnInit(): void {

    this.addUsersForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
    })

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


  create() {
    this.submittedUser = true
    this.successUser = false;

    if (this.addUsersForm.invalid)
      return;
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
  }

  setUserSelected(user: any) {
    this.userSelected = user
  }

  removerUser(id: Number) {

  }

  getUsers() {
    this.users = [
      {
        id: 1,
        name: 'Usuário Carlos',
        email: 'carlos@gmail.com',
      },
      {
        id: 2,
        name: 'Usuário Antonio',
        email: 'antonio@gmail.com',
      }
    ];
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
