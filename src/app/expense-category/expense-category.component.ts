import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ExpenseCategoriesService } from '../core/shared/services/expense-categories.service';

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
    private toastr: ToastrService,
    private expenseCategoryService: ExpenseCategoriesService
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

    
    const data = this.addExpenseCategorysForm.value

    this.expenseCategoryService.create(data)
      .subscribe({
        next: (res: any) => {

          this.toastr.success("Categoria de Despesas cadastrada com sucesso!", "Categoria de Despesas")

          this.addExpenseCategorysForm.reset()
          this.addExpenseCategorysForm.clearValidators()

          this.submittedExpenseCategory = false
          this.successExpenseCategory = true;


          this.getExpenseCategorys()

        },
        error: err => {

  
          this.submittedExpenseCategory = false
          this.successExpenseCategory = true;
        

          this.toastr.error("Falha ao cadastrar as Tipos de vistoria", "Cadastrar Tipos Vistoria")
        }
      })


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

    const data = this.editExpenseCategorysForm.value

    this.expenseCategoryService.update(this.expenseCategorySelected?.id, data)
      .subscribe({
        next: (res: any) => {

          this.toastr.success("Categoria de Despesas atualizada com sucesso!", "Categoria de Despesas")

          this.submittedExpenseCategory = false
          this.successExpenseCategory = true;

          this.getExpenseCategorys()


        },
        error: err => {

          this.submittedExpenseCategory = false
          this.successExpenseCategory = false;

          this.toastr.error("Falha ao atualizar categoria de depesas", "Categoria de Despesas")
        }
      })
  }

  setExpenseCategorySelected(expenseCategory: any) {
    this.expenseCategorySelected = expenseCategory
  }

  removerExpenseCategory(id: Number) {

    this.expenseCategoryService.delete(id)
    .subscribe({
      next: (res : any) => {

        this.getExpenseCategorys()

      },
      error: err => {
        this.toastr.error("Falha ao remover a categoria de Despesas", "Categoria de Depesas")
      }
    })


  }

  getExpenseCategorys() {


    this.expenseCategoryService.list()
    .subscribe({
      next: (res : any) => {
        this.expenseCategorys = res 

      },
      error: err => {
        console.log("Falha ao buscar os categorias de Despesas", err)
      }
    })



    /** 
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
    ];*/
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
