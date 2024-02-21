import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbDate, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { IncomeService } from '../core/shared/services/income.service';
import { AccountService } from '../core/shared/services/account.service';
import { CustomerService } from '../core/shared/services/customers.service';
import { IncomeCategoriesService } from '../core/shared/services/income-categories.service';

@Component({
  selector: 'app-bills-to-receive',
  templateUrl: './bills-to-receive.component.html',
  styleUrls: ['./bills-to-receive.component.scss']
})
export class BillsToReceiveComponent {

  itemsPerPage: number = 10;
  currentPage: number = 1;
  closeResult: string = '';
  public addIncomesForm: FormGroup;
  public editIncomesForm: FormGroup;
  public confirmPaymentForm: FormGroup;
  public filtersForm: FormGroup;
  public incomes: any[];
  public accounts: any[];
  public customers: any[];
  public incomeCategorys: any[];

  public submittedIncome: Boolean;
  public successIncome: Boolean;

  public incomeSelected: any;

  fromDate: NgbDate | null
  toDate: NgbDate | null

  fn: any;
  paramsDelete: any;

  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private incomeService: IncomeService,
    private accountService: AccountService,
    private customerService: CustomerService,
    private incomeCategoryService: IncomeCategoriesService,
  ) { }


  ngOnInit(): void {

    this.addIncomesForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      value: new FormControl(null, [Validators.required]),
      account_id: new FormControl(null, [Validators.required]),
      income_category_id: new FormControl(null, [Validators.required]),
      customer_id: new FormControl(null,  [Validators.required]),
      due_at: new FormControl(null, [Validators.required]),
      nf: new FormControl(null, [Validators.nullValidator]),
      launch_at: new FormControl(null, [Validators.nullValidator]),
      payment_type: new FormControl(null, [Validators.nullValidator]),
      isPayment: new FormControl(false, [Validators.nullValidator]),
      value_paid: new FormControl(null, [Validators.nullValidator]),
      paid_at: new FormControl(null, [Validators.nullValidator]),
      discount: new FormControl(null, [Validators.nullValidator]),
      fines: new FormControl(null, [Validators.nullValidator]),
    })

    this.editIncomesForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      value: new FormControl(null, [Validators.required]),
      account_id: new FormControl(null, [Validators.required]),
      income_category_id: new FormControl(null, [Validators.required]),
      customer_id: new FormControl(null,  [Validators.required]),
      due_at: new FormControl(null, [Validators.required]),
      nf: new FormControl(false, [Validators.nullValidator]),
      launch_at: new FormControl(null, [Validators.nullValidator]),
      payment_type: new FormControl(null, [Validators.nullValidator]),
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
      income_category_id: new FormControl(null, [Validators.nullValidator]),
      status: new FormControl(null, [Validators.nullValidator]),
    })

    this.getIncomes();
    this.getCustomers()
    this.getAccounts()
    this.getIncomeCategorys()
  }

  get addForm() {
    return this.addIncomesForm.controls
  }

  get editForm() {
    return this.editIncomesForm.controls
  }

  get paymentForm() {
    return this.confirmPaymentForm.controls
  }

  get filterForm() {
    return this.filtersForm.controls
  }

  getCustomers() {

    this.customerService.list()
      .subscribe({
        next: (res : any) => {
          this.customers = res
        },
        error: err => {
          console.log("Falha ao buscar os clientes", err)
        }
      })
  }

  getAccounts() {


    this.accountService.list()
      .subscribe({
        next: (res : any) => {
          this.accounts = res

          console.log(this.accounts)

        },
        error: err => {
          console.log("Falha ao buscar os clientes", err)
        }
      })
  }

  getIncomeCategorys() {


    this.incomeCategoryService.list()
    .subscribe({
      next: (res : any) => {
        this.incomeCategorys = res 
      },
      error: err => {
        
        this.toastr.error("Falha ao buscar categoria de receita", "Categoria de Receita")

      }
    })
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

  getDataAtual() {

    const dataAtual = new Date();

    // Obtém o dia, mês e ano da data atual
    const dia = String(dataAtual.getDate()).padStart(2, '0');
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0'); // Os meses são indexados de 0 a 11
    const ano = dataAtual.getFullYear();

    // Formata a data no estilo americano (MM/DD/AAAA)
    const dataFormatada = `${ano}-${mes}-${dia}`; 

    return dataFormatada

  }

  create() {
    this.submittedIncome = true
    this.successIncome = false;

    if (this.addIncomesForm.invalid)
      return;

    //Validação
    if (this.addIncomesForm.controls['isPayment'].value) {
      const invalid = [undefined, null, ''];
      let haveError: boolean = false;
      const fields = [
        { name: 'value_paid', error_name: 'Valor pago' },
        { name: 'paid_at', error_name: 'Data de Pagamento' },
        { name: 'discount', error_name: 'Desconto' },
        { name: 'fines', error_name: 'Multa' },
      ];

      for (const field of fields) {
        if (invalid.includes(this.addIncomesForm.controls[field.name].value)) {
          this.toastr.error(`O(a) ${field.error_name} é obrigatório(a)!`, 'Formulário Inválido')
          haveError = true;
        }
      }

      if (haveError) return;
    }

    const data = this.addIncomesForm.value

    data["type"] = "DEFAULT";
    data["status"] = data["is_payment"] ? "PAID": "NOT_PAID";
    data["launch_at"] = this.getDataAtual()

    this.incomeService.create(data)
      .subscribe({
        next: (resIncome : any[]) => {


          this.toastr.success("Receita editada com sucesso!", "Receita")

          this.getIncomes()


        },
        error: err => {

          this.toastr.error("Falha ao editar Receita!", "Receita")

          console.log("error", err)
        }
      })


  }

  onEditIncome(income: any) {
    this.editIncomesForm.controls['nf'].setValue(income?.nf)
    this.editIncomesForm.controls['name'].setValue(income.name)
    this.editIncomesForm.controls['value'].setValue(income.value)
    this.editIncomesForm.controls['account_id'].setValue(income.account_id)
    this.editIncomesForm.controls['customer_id'].setValue(income.customer_id)
    this.editIncomesForm.controls['income_category_id'].setValue(income.income_category_id)
    this.editIncomesForm.controls['due_at'].setValue(income.due_at)
    this.editIncomesForm.controls['isPayment'].setValue(income?.value_paid ? true : false)
    this.editIncomesForm.controls['value_paid'].setValue(income.value_paid)
    this.editIncomesForm.controls['paid_at'].setValue(income.paid_at)
    this.editIncomesForm.controls['discount'].setValue(income.discount)
    this.editIncomesForm.controls['fines'].setValue(income.fines)

    this.editIncomesForm.controls['payment_type'].setValue(income.payment_type)
    this.editIncomesForm.controls['launch_at'].setValue(income.launch_at)

    this.incomeSelected = income
  }

  onConfirmPaymentSelected(income: any) {
    this.confirmPaymentForm.controls['value_paid'].setValue(income?.value)
    this.confirmPaymentForm.controls['paid_at'].setValue((new Date)?.toJSON()?.slice(0, 10))

    this.incomeSelected = income
  }

  update() {
    this.submittedIncome = true
    this.successIncome = false;

    if (this.editIncomesForm.invalid)
      return;

    const data = this.editIncomesForm.value
   

    data["status"] = data["is_payment"] ? "PAID": "NOT_PAID";
    
    this.incomeService.update(this.incomeSelected?.id, data )
      .subscribe({
        next: (resIncome : any[]) => {


          this.toastr.success("Receita editada com sucesso!", "Receita")

          this.getIncomes()


        },
        error: err => {

          this.toastr.error("Falha ao editar Receita!", "Receita")

          console.log("error", err)
        }
      })


  }

  setIncomeSelected(income: any) {
    this.incomeSelected = income
  }

  removerIncome(id: Number) {

    this.incomeService.delete(id)
      .subscribe({
        next: (resIncome : any) => {

         this.toastr.success("Contas a receber deletada com sucesso", "Receitas")


        },
        error: err => {

          this.toastr.error("Falha ao deletar contas a receber", "Receitas")

          console.log("error", err)
        }
      })



  }

  paidIncome() {
    this.submittedIncome = true
    this.successIncome = false;

    console.log(this.confirmPaymentForm.invalid)

    if (this.confirmPaymentForm.invalid)
      return;

    const data = this.confirmPaymentForm.value
    
    this.incomeService.confirmPayment(this.incomeSelected?.id, data )
      .subscribe({
        next: (resIncome : any[]) => {


          this.toastr.success("Receita paga com sucesso!", "Receita")

          this.getIncomes()


        },
        error: err => {

          this.toastr.error("Falha ao pagar Receita!", "Receita")

          console.log("error", err)
        }
      })
  }

  getIncomeWithFilter() {


    const invalid = [undefined, null, ''];
    const filters = this.filtersForm.value;
    filters.startDate = `${this.fromDate.year}-${this.fromDate.month}-${this.fromDate.day}`;
    filters.endDate = `${this.toDate.year}-${this.toDate.month}-${this.toDate.day}`;

    for (const key in filters) {
      if (invalid.includes(filters?.[key])) {
        delete filters[key];
      }


    }


    console.log(filters)

   // console.log(this.fromDate)
    //console.log(this.toDate)
    this.getIncomes(filters);
  }

  getIncomes(filters?: any) {

    if (filters) {
      //aplicar filtros
    }


    this.incomeService.list()
      .subscribe({
        next: (resIncome : any[]) => {

          this.incomes = resIncome


        },
        error: err => {
          console.log("error", err)
        }
      })


    /** 
    this.incomes = [
      {
        id: 3,
        name: "Pagamento de Luz",
        value: 50,
        account_id: 1,
        income_category_id: 1,
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
        income_category: {
          id: 1,
          name: 'Categoria de Receita 1',
        },
      },
      {
        id: 4,
        name: "Pagamento de Agua",
        value: 50,
        account_id: 1,
        income_category_id: 1,
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
        income_category: {
          id: 2,
          name: 'Categoria de Receita 2',
        },
      }
    ];

    this.incomeCategorys = [
      { id: 1, name: 'Categoria de Receita 1', },
      { id: 2, name: 'Categoria de Receita 2', }
    ];

    this.accounts = [
      { id: 1, name: 'PIX', },
      { id: 2, name: 'Caixa', }
    ]; */
  }

  toServices(income: any) {

  }

  confirmationDelete() {
    this.fn(...this.paramsDelete);
  }

  private getDismissReason(reason: any): string {

    this.successIncome = false;
    this.submittedIncome = false;


    this.addIncomesForm.reset()
    this.addIncomesForm.setErrors(null)

    this.editIncomesForm.reset()
    this.editIncomesForm.setErrors(null)

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
