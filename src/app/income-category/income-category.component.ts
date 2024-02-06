import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-income-category',
  templateUrl: './income-category.component.html',
  styleUrls: ['./income-category.component.scss']
})
export class IncomeCategoryComponent {

  closeResult: string = '';
  public addIncomeCategorysForm: FormGroup;
  public editIncomeCategorysForm: FormGroup;
  public incomeCategorys: any[];

  public submittedIncomeCategory: Boolean;
  public successIncomeCategory: Boolean;

  public incomeCategorySelected: any;

  fn: any;
  paramsDelete: any;

  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService
  ) { }


  ngOnInit(): void {

    this.addIncomeCategorysForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.nullValidator])
    })

    this.editIncomeCategorysForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.nullValidator])
    })

    this.getIncomeCategorys();
  }

  get addForm() {
    return this.addIncomeCategorysForm.controls
  }

  get editForm() {
    return this.editIncomeCategorysForm.controls
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
    this.submittedIncomeCategory = true
    this.successIncomeCategory = false;

    if (this.addIncomeCategorysForm.invalid)
      return;
  }

  onEditIncomeCategory(incomeCategory: any) {
    this.editIncomeCategorysForm.controls['name'].setValue(incomeCategory.name)

    this.incomeCategorySelected = incomeCategory
  }

  update() {
    this.submittedIncomeCategory = true
    this.successIncomeCategory = false;

    if (this.editIncomeCategorysForm.invalid)
      return;
  }

  setIncomeCategorySelected(incomeCategory: any) {
    this.incomeCategorySelected = incomeCategory
  }

  removerIncomeCategory(id: Number) {

  }

  getIncomeCategorys() {
    this.incomeCategorys = [
      {
        id: 1,
        name: 'Categoria de Receita 1',
      },
      {
        id: 2,
        name: 'Categoria de Receita 2',
      }
    ];
  }

  confirmationDelete() {
    this.fn(...this.paramsDelete);
  }

  private getDismissReason(reason: any): string {

    this.successIncomeCategory = false;
    this.submittedIncomeCategory = false;


    this.addIncomeCategorysForm.reset()
    this.addIncomeCategorysForm.setErrors(null)

    this.editIncomeCategorysForm.reset()
    this.editIncomeCategorysForm.setErrors(null)

    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
