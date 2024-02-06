import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-expense-category',
  templateUrl: './expense-category.component.html',
  styleUrls: ['./expense-category.component.scss']
})
export class ExpenseCategoryComponent {

  closeResult: string = '';
  public addExpenseCategorysForm: FormGroup;
  public editExpenseCategorysForm: FormGroup;
  public expenseCategorys: any[];

  public submittedExpenseCategory: Boolean;
  public successExpenseCategory: Boolean;

  public expenseCategorySelected: any;

  fn: any;
  paramsDelete: any;

  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService
  ) { }


  ngOnInit(): void {

    this.addExpenseCategorysForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.nullValidator])
    })

    this.editExpenseCategorysForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.nullValidator])
    })

    this.getExpenseCategorys();
  }

  get addForm() {
    return this.addExpenseCategorysForm.controls
  }

  get editForm() {
    return this.editExpenseCategorysForm.controls
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
    this.submittedExpenseCategory = true
    this.successExpenseCategory = false;

    if (this.addExpenseCategorysForm.invalid)
      return;
  }

  onEditExpenseCategory(expenseCategory: any) {
    this.editExpenseCategorysForm.controls['name'].setValue(expenseCategory.name)
    this.editExpenseCategorysForm.controls['description'].setValue(expenseCategory.description)

    this.expenseCategorySelected = expenseCategory
  }

  update() {
    this.submittedExpenseCategory = true
    this.successExpenseCategory = false;

    if (this.editExpenseCategorysForm.invalid)
      return;
  }

  setExpenseCategorySelected(expenseCategory: any) {
    this.expenseCategorySelected = expenseCategory
  }

  removerExpenseCategory(id: Number) {

  }

  getExpenseCategorys() {
    this.expenseCategorys = [
      {
        id: 1,
        name: 'Categoria de Despesa 1',
        description: 'Desc categoria de despesa 1',
      },
      {
        id: 2,
        name: 'Categoria de Despesa 2',
        description: 'Desc categoria de despesa 2',
      }
    ];
  }

  confirmationDelete() {
    this.fn(...this.paramsDelete);
  }

  private getDismissReason(reason: any): string {

    this.successExpenseCategory = false;
    this.submittedExpenseCategory = false;


    this.addExpenseCategorysForm.reset()
    this.addExpenseCategorysForm.setErrors(null)

    this.editExpenseCategorysForm.reset()
    this.editExpenseCategorysForm.setErrors(null)

    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
