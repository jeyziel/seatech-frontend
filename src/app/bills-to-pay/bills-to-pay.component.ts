import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbDate, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bills-to-pay',
  templateUrl: './bills-to-pay.component.html',
  styleUrls: ['./bills-to-pay.component.scss']
})
export class BillsToPayComponent {

  itemsPerPage: number = 10;
  currentPage: number = 1;
  closeResult: string = '';
  public addExpensesForm: FormGroup;
  public editExpensesForm: FormGroup;
  public confirmPaymentForm: FormGroup;
  public filtersForm: FormGroup;
  public expenses: any[];
  public accounts: any[];
  public expenseCategorys: any[];

  public submittedExpense: Boolean;
  public successExpense: Boolean;

  public expenseSelected: any;

  fromDate: NgbDate | null
  toDate: NgbDate | null

  fn: any;
  paramsDelete: any;

  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
  ) { }


  ngOnInit(): void {

    this.addExpensesForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      value: new FormControl(null, [Validators.required]),
      account_id: new FormControl(null, [Validators.required]),
      expense_category_id: new FormControl(null, [Validators.required]),
      due_at: new FormControl(null, [Validators.required]),
      nf: new FormControl(null, [Validators.nullValidator]),
      isPayment: new FormControl(false, [Validators.nullValidator]),
      value_paid: new FormControl(null, [Validators.nullValidator]),
      paid_at: new FormControl(null, [Validators.nullValidator]),
      discount: new FormControl(null, [Validators.nullValidator]),
      fines: new FormControl(null, [Validators.nullValidator]),
    })

    this.editExpensesForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      value: new FormControl(null, [Validators.required]),
      account_id: new FormControl(null, [Validators.required]),
      expense_category_id: new FormControl(null, [Validators.required]),
      due_at: new FormControl(null, [Validators.required]),
      nf: new FormControl(false, [Validators.nullValidator]),
      isPayment: new FormControl(false, [Validators.nullValidator]),
      value_paid: new FormControl(null, [Validators.nullValidator]),
      paid_at: new FormControl(null, [Validators.nullValidator]),
      discount: new FormControl(null, [Validators.nullValidator]),
      fines: new FormControl(null, [Validators.nullValidator]),
    })

    this.confirmPaymentForm = new FormGroup({
      value_paid: new FormControl(null, [Validators.required]),
      paid_at: new FormControl(null, [Validators.required]),
    })

    this.filtersForm = new FormGroup({
      type: new FormControl(null, [Validators.nullValidator]),
      expense_category_id: new FormControl(null, [Validators.nullValidator]),
      status: new FormControl(null, [Validators.nullValidator]),
    })

    this.getExpenses();
  }

  get addForm() {
    return this.addExpensesForm.controls
  }

  get editForm() {
    return this.editExpensesForm.controls
  }

  get paymentForm() {
    return this.confirmPaymentForm.controls
  }

  get filterForm() {
    return this.filtersForm.controls
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
    this.submittedExpense = true
    this.successExpense = false;

    if (this.addExpensesForm.invalid)
      return;

    //Validação
    if (this.addExpensesForm.controls['isPayment'].value) {
      const invalid = [undefined, null, ''];
      let haveError: boolean = false;
      const fields = [
        { name: 'value_paid', error_name: 'Valor pago' },
        { name: 'paid_at', error_name: 'Data de Pagamento' },
        { name: 'discount', error_name: 'Desconto' },
        { name: 'fines', error_name: 'Multa' },
      ];

      for (const field of fields) {
        if (invalid.includes(this.addExpensesForm.controls[field.name].value)) {
          this.toastr.error(`O(a) ${field.error_name} é obrigatório(a)!`, 'Formulário Inválido')
          haveError = true;
        }
      }

      if (haveError) return;
    }

    const data = this.addExpensesForm.value
  }

  onEditExpense(expense: any) {
    this.editExpensesForm.controls['nf'].setValue(expense?.nf)
    this.editExpensesForm.controls['name'].setValue(expense.name)
    this.editExpensesForm.controls['value'].setValue(expense.value)
    this.editExpensesForm.controls['account_id'].setValue(expense.account_id)
    this.editExpensesForm.controls['expense_category_id'].setValue(expense.expense_category_id)
    this.editExpensesForm.controls['due_at'].setValue(expense.due_at)
    this.editExpensesForm.controls['isPayment'].setValue(expense?.value_paid ? true : false)
    this.editExpensesForm.controls['value_paid'].setValue(expense.value_paid)
    this.editExpensesForm.controls['paid_at'].setValue(expense.paid_at)
    this.editExpensesForm.controls['discount'].setValue(expense.discount)
    this.editExpensesForm.controls['fines'].setValue(expense.fines)

    this.expenseSelected = expense
  }

  onConfirmPaymentSelected(expense: any) {
    this.confirmPaymentForm.controls['value_paid'].setValue(expense?.value)
    this.confirmPaymentForm.controls['paid_at'].setValue((new Date)?.toJSON()?.slice(0, 10))

    this.expenseSelected = expense
  }

  update() {
    this.submittedExpense = true
    this.successExpense = false;

    if (this.editExpensesForm.invalid)
      return;

    const data = this.editExpensesForm.value

  }

  setExpenseSelected(expense: any) {
    this.expenseSelected = expense
  }

  removerExpense(id: Number) {


  }

  confirmPayment() {
    this.submittedExpense = true
    this.successExpense = false;

    if (this.confirmPaymentForm.invalid)
      return;
  }

  getExpenseWithFilter() {

    const invalid = [undefined, null, ''];
    const filters = this.filtersForm.value;
    filters.startDate = `${this.fromDate.year}-${this.fromDate.month}-${this.fromDate.day}`;
    filters.endDate = `${this.toDate.year}-${this.toDate.month}-${this.toDate.day}`;

    for (const key in filters) {
      if (invalid.includes(filters?.[key])) {
        delete filters[key];
      }
    }

    this.getExpenses(filters);
  }

  getExpenses(filters?: any) {
    if (filters) {
      //aplicar filtros
    }

    this.expenses = [
      {
        id: 3,
        name: "Pagamento de Fornecedor",
        value: 52,
        account_id: 1,
        expense_category_id: 1,
        discount: 0,
        customer_id: 11,
        status: "PAID",
        type: 'OPERATION',
        paid_at: "2023-12-25",
        value_paid: 60,
        due_at: "2023-12-25",
        launch_at: "2023-12-20",
        updated_at: "2023-12-24T00:18:46.000000Z",
        created_at: "2023-12-24T00:18:46.000000Z",
        expense_category: {
          id: 1,
          name: 'Categoria de Receita 1',
        },
      },
      {
        id: 4,
        name: "Pagamento de Folha Salarial",
        value: 50,
        account_id: 1,
        expense_category_id: 1,
        discount: 0,
        customer_id: 11,
        status: "NOT_PAID",
        type: 'DEFAULT',
        paid_at: null,
        value_paid: null,
        due_at: "2024-01-30",
        launch_at: "2023-12-20",
        updated_at: "2023-12-24T00:18:46.000000Z",
        created_at: "2023-12-24T00:18:46.000000Z",
        expense_category: {
          id: 2,
          name: 'Categoria de Despesa 2',
        },
      }
    ];

    this.expenseCategorys = [
      { id: 1, name: 'Categoria de Despesa 1', },
      { id: 2, name: 'Categoria de Despesa 2', }
    ];

    this.accounts = [
      { id: 1, name: 'Bradesco', },
      { id: 2, name: 'Santander', }
    ];
  }

  confirmationDelete() {
    this.fn(...this.paramsDelete);
  }

  private getDismissReason(reason: any): string {

    this.successExpense = false;
    this.submittedExpense = false;


    this.addExpensesForm.reset()
    this.addExpensesForm.setErrors(null)

    this.editExpensesForm.reset()
    this.editExpensesForm.setErrors(null)

    this.confirmPaymentForm.reset()
    this.confirmPaymentForm.setErrors(null)

    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
