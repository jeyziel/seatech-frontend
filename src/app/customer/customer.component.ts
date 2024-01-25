import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  closeResult: string = '';
  public addCustomersForm: FormGroup;
  public editCustomersForm: FormGroup;
  public customers: any[];

  public submittedCustomer: Boolean;
  public successCustomer: Boolean;

  public customerSelected: any;

  fn: any;
  paramsDelete: any;

  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService
  ) { }


  ngOnInit(): void {

    this.addCustomersForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      cnpj: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.nullValidator])
    })

    this.editCustomersForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      cnpj: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.nullValidator])
    })

    this.getCustomers();
  }

  get addForm() {
    return this.addCustomersForm.controls
  }

  get editForm() {
    return this.editCustomersForm.controls
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
    this.submittedCustomer = true
    this.successCustomer = false;

    if (this.addCustomersForm.invalid)
      return;
  }

  onEditCustomer(customer: any) {
    this.editCustomersForm.controls['name'].setValue(customer.name)
    this.editCustomersForm.controls['cnpj'].setValue(customer.cnpj)
    this.editCustomersForm.controls['description'].setValue(customer.description)

    this.customerSelected = customer
  }

  update() {
    this.submittedCustomer = true
    this.successCustomer = false;

    if (this.editCustomersForm.invalid)
      return;
  }

  removerCustomer(id: Number) {

  }

  getCustomers() {
    this.customers = [
      {
        id: 1,
        name: 'Carlos',
        cnpj: '1111222234',
        description: 'Cliente 1',
      },
      {
        id: 2,
        name: 'Antonio',
        cnpj: '555222234',
        description: 'Cliente 2',
      }
    ];
  }

  confirmationDelete() {
    this.fn(...this.paramsDelete);
  }

  private getDismissReason(reason: any): string {

    this.successCustomer = false;
    this.submittedCustomer = false;


    this.addCustomersForm.reset()
    this.addCustomersForm.setErrors(null)

    this.editCustomersForm.reset()
    this.editCustomersForm.setErrors(null)

    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
