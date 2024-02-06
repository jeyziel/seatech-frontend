import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {

  closeResult: string = '';
  public addAccountsForm: FormGroup;
  public editAccountsForm: FormGroup;
  public accounts: any[];

  public submittedAccount: Boolean;
  public successAccount: Boolean;

  public accountSelected: any;

  fn: any;
  paramsDelete: any;

  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService
  ) { }


  ngOnInit(): void {

    this.addAccountsForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      number: new FormControl(null, [Validators.required])
    })

    this.editAccountsForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      number: new FormControl(null, [Validators.required])
    })

    this.getAccounts();
  }

  get addForm() {
    return this.addAccountsForm.controls
  }

  get editForm() {
    return this.editAccountsForm.controls
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
    this.submittedAccount = true
    this.successAccount = false;

    if (this.addAccountsForm.invalid)
      return;
  }

  onEditAccount(account: any) {
    this.editAccountsForm.controls['name'].setValue(account.name)
    this.editAccountsForm.controls['number'].setValue(account.number)

    this.accountSelected = account
  }

  update() {
    this.submittedAccount = true
    this.successAccount = false;

    if (this.editAccountsForm.invalid)
      return;
  }

  setAccountSelected(account: any) {
    this.accountSelected = account
  }

  removerAccount(id: Number) {

  }

  getAccounts() {
    this.accounts = [
      {
        id: 1,
        name: 'PIX',
        number: '1111222234',
      },
      {
        id: 2,
        name: 'Caixa',
        number: '5552-2223-4111-5698',
      }
    ];
  }

  confirmationDelete() {
    this.fn(...this.paramsDelete);
  }

  private getDismissReason(reason: any): string {

    this.successAccount = false;
    this.submittedAccount = false;


    this.addAccountsForm.reset()
    this.addAccountsForm.setErrors(null)

    this.editAccountsForm.reset()
    this.editAccountsForm.setErrors(null)

    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
