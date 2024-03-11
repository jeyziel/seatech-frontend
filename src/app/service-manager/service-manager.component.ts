import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';
import { AtendimentoService } from '../core/shared/services/atendimento.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { SurveyService } from '../core/shared/services/surveys.service';
import { CustomerService } from '../core/shared/services/customers.service';
import { HarborService } from '../core/shared/services/harbor.service';
import { SurveyServiceService } from '../core/shared/services/surveys-service.service';
import { AccountService } from '../core/shared/services/account.service';
import { ExpenseServiceService } from '../core/shared/services/surveys-service.service copy';
import { ExpenseCategoriesService } from '../core/shared/services/expense-categories.service';
import { ExpenseService } from '../core/shared/services/expense.service';

@Component({
  selector: 'app-service-manager',
  templateUrl: './service-manager.component.html',
  styleUrls: ['./service-manager.component.scss']
})
export class ServiceManagerComponent {

  closeResult: string = '';
  public addServiceSurveys: FormGroup;
  public addExpenses: FormGroup;
  public service: any;
  public serviceSurveys: any;
  public expenses: any[];

  public service_id;

  public surveys: any[];
  public harbors: any[];
  public customers: any[];
  public accounts: any[];
  public expenseCategorys: any[];

  public isPayment: Boolean = false;
  public submitted: Boolean;
  public success: Boolean;

  public surveys_value: Number = 0;
  public expense_value: Number = 0;

  public serviceSurveysSelected: any;
  public expenseSelected: any;

  public confirmPaymentForm: FormGroup;
  public submittedExpense = true
  public successExpense = false;

  fn: any;
  paramsDelete: any;

  constructor(
    private modalService: NgbModal,
    private location: Location,
    private atendimentoService: AtendimentoService,
    private managerSurveyService: SurveyServiceService,
    private expenseSurveys: ExpenseServiceService,
    private expenseService:  ExpenseService,
    private surveyService: SurveyService,
    private customerService: CustomerService,
    private harborService: HarborService,
    private accountService: AccountService,
    private expenseCategoriesService : ExpenseCategoriesService,
    private toastr: ToastrService,
    private router: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.addServiceSurveys = new FormGroup({
      price: new FormControl(null, [Validators.required]),
      survey_id: new FormControl(null, [Validators.required]),
      survey_at: new FormControl((new Date)?.toJSON()?.slice(0, 10), [Validators.required]),
      customer_id: new FormControl(null, [Validators.required]),
      harbor_id: new FormControl(null, [Validators.required]),
    })

    this.addExpenses = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      value: new FormControl(null, [Validators.required]),
      type: new FormControl('OPERATION', [Validators.required]),
      account_id: new FormControl(null, [Validators.required]),
      expense_category_id: new FormControl(null, [Validators.required]),
      due_at: new FormControl(null, [Validators.required]),
      launch_at: new FormControl(null, [Validators.required]),
      isPayment: new FormControl(false, [Validators.nullValidator]),
      value_paid: new FormControl(null, [Validators.nullValidator]),
      paid_at: new FormControl(null, [Validators.nullValidator]),
      discount: new FormControl(0, [Validators.nullValidator]),
      fines: new FormControl(0, [Validators.nullValidator]),
      status: new FormControl(false, [Validators.nullValidator]),
    })

    this.service_id = this.router.snapshot.params['id']

    this.confirmPaymentForm = new FormGroup({
      value_paid: new FormControl(null, [Validators.required]),
      paid_at: new FormControl(null, [Validators.required]),
    })

    // "name": "Pagamento de Agua",
    // "value": 50,
    // "type": "OPERATION",
    // "account_id": 1,
    // "expense_category_id": 1,
    // "status": "PAID",
    // "due_at": "2023-12-25",
    // "launch_at": "2023-12-20",
    // "value_paid": 50,
    // "paid_at": "2023-12-23",
    // "discount": 2,
    // "fines": 1


    this.getServiceSurveys();
    this.getServiceExpenses();

    this.getServices()
    this.getCustomers()
    this.getHarbors()
    this.getSurveys()

    this.getExpenseCategories()
    this.getAccounts()


  }

  get addServiceSurveyForm() {
    return this.addServiceSurveys.controls
  }

  get addExpenseForm() {
    return this.addExpenses.controls
  }

  get paymentForm() {
    return this.confirmPaymentForm.controls
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
    this.submitted = true
    this.success = false;

    if (this.addServiceSurveyForm.invalid)
      return;

    const data = this.addServiceSurveys.value

    this.managerSurveyService.create(this.service_id, data)
      .subscribe({
        next: res => {

          this.submitted = false
          this.success = true;

          this.toastr.success("Vistoria adicionada com sucesso", "Vistórias")

          this.getServiceSurveys()

        },
        error: err => {

          this.submitted = true
          this.success = false;

          this.toastr.error("Falha ao adicionar vistórias", "Vistórias")
        }
      })


  }

  createExpense() {
    this.submitted = true
    this.success = false;

    console.log(this.addExpenseForm.value)

    if (this.addExpenseForm.invalid)
      return;


    const data = this.addExpenses.value
    data["status"] = data["status"] == true ? "PAID" : "NOT_PAID";
    data["service_id"] = this.service_id
    data["type"] = "SERVICES"



    this.expenseSurveys.create(this.service_id, data)
    .subscribe({
      next: (res: any) => {


        this.toastr.success("Despesa adicionada ao atendimento", "Despesa de Atendimento");


        this.getServiceExpenses()

      },
      error: err => {

        console.log(err)

        this.toastr.error("Falha ao adicionar despesa ao atendimento", "Despesa de Atendimento");


      }
    })



  }

  removerServiceSurvey(id: Number) {


    this.managerSurveyService.delete(this.service_id, id)
      .subscribe({
        next: res => {

          this.getServiceSurveys()

          this.toastr.success("Vistoria removida com sucesso", "Excluir Despesa")
        },
        error: err => {

          this.toastr.error("Falha ao excluir Vistoria", "Excluir Despesa")

        }
      })


  }

  removerExpense(id: Number) {

    this.expenseSurveys.delete(this.service_id, this.expenseSelected.id)
      .subscribe({
        next: res => {

          this.getServiceExpenses()

          this.toastr.success("Despesa removida com sucesso", "Excluir Despesa")
        },
        error: err => {

          this.toastr.error("Falha ao excluir despesa", "Excluir Despesa")

        }
      })


  }

  async getServices() {


    this.atendimentoService.show(this.service_id)
      .subscribe({
        next: (res: any[]) => {
          this.service = res
        },
        error: err => {
          this.toastr.error("Falha ao buscar atendimento", "Atendimentos")
        }
      })
  }

  getSurveys() {


    this.surveyService.list()
      .subscribe({
        next: (res: any[]) => {

          this.surveys = res

        },
        error: err => {
          this.toastr.error("Falha ao buscar as vistorias", "Vistórias")
          console.log(err)
        }
      })
  }

  getHarbors() {




    this.harborService.list()
      .subscribe({
        next: (res : any) => {
          this.harbors = res

        },
        error: err => {
          console.log("Falha ao realizar Login", err)
        }
      })
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

  getExpenseCategories() {


    this.expenseCategoriesService.list()
      .subscribe({
        next: (res : any) => {
          this.expenseCategorys = res

        },
        error: err => {
          console.log("Falha ao buscar os clientes", err)
        }
      })
  }

  getServiceSurveys() {

    this.managerSurveyService.show(this.service_id)
      .subscribe({
        next: (res: any) => {
          this.serviceSurveys = res.service_surveys

          
          this.surveys_value = this.serviceSurveys?.reduce((acc, curr) => {
            return acc + curr.price;
          }, 0) ?? 0;

        


      

        },
        error: err => {

          console.log("Fakha")

        }
      })


    /**
    this.service = {
      id: 1,
      ship_name: 'Navio Pequeno',
      description: 'Desc Operacional',
      status: 'IN_PROGRESS',
      value_survey: 190.59,
      value_expense: 20.59,
    };




    this.serviceSurveys = [
      {
        id: 1,
        survey_id: 1,
        price: 25.72,
        survey_at: '2024-03-01',
        customer_id: 1,
        harbor_id: 2,
        biling_status: 'PENDING',
        harbor: { id: 1, name: 'Porto 1', },
        customer: { id: 2, name: 'Antonio', },
        survey: { id: 2, name: 'Vistoria 2', }
      },
      {
        id: 1,
        survey_id: 1,
        price: 25.72,
        survey_at: '2024-03-01',
        customer_id: 1,
        harbor_id: 2,
        biling_status: 'DRAFT',
        harbor: { id: 1, name: 'Porto 1', },
        customer: { id: 2, name: 'Antonio', },
        survey: { id: 2, name: 'Vistoria 2', }
      },
      {
        id: 1,
        survey_id: 1,
        price: 25.72,
        survey_at: '2024-03-01',
        customer_id: 1,
        harbor_id: 2,
        biling_status: 'CONCLUDED',
        harbor: { id: 1, name: 'Porto 1', },
        customer: { id: 1, name: 'Carlos', },
        survey: { id: 1, name: 'Vistoria 1', }
      }
    ];

    this.expenses = [
      {
        name: 'Pagamento de Agua',
        value: 50,
        type: 'DEFAULT',
        account_id: 1,
        expense_category_id: 1,
        status: 'PAID',
        due_at: '',
        launch_at: '',
        value_paid: 50,
        paid_at: '2023-12-23',
        discount: 2,
        fines: 1,
        expense_category: { id: 1, name: 'Categoria de Despesa 1', },
      },
      {
        name: 'Pagamento de Luz',
        value: 50,
        type: 'OPERATION',
        account_id: 1,
        expense_category_id: 1,
        status: 'NOT_PAID',
        due_at: '',
        launch_at: '',
        value_paid: 50,
        paid_at: '2023-12-23',
        discount: 2,
        fines: 1,
        expense_category: { id: 1, name: 'Categoria de Despesa 1', },
      }
    ];

    this.expenseCategorys = [
      { id: 1, name: 'Categoria de Despesa 1', },
      { id: 2, name: 'Categoria de Despesa 2', }
    ];

    this.surveys = [
      { id: 1, name: 'Vistoria 1', },
      { id: 2, name: 'Vistoria 2', }
    ];

    this.harbors = [
      { id: 1, name: 'Porto 1', },
      { id: 2, name: 'Porto 2', },
    ];

    this.customers = [
      { id: 1, name: 'Carlos', },
      { id: 2, name: 'Antonio', }
    ];

    this.accounts = [
      { id: 1, name: 'PIX', },
      { id: 2, name: 'Caixa', }
    ];*/
  }

  getServiceExpenses() {

    this.expenseSurveys.show(this.service_id)
      .subscribe({
        next: (res: any) => {
          this.expenses = res

          this.expense_value = this.expenses.reduce((acc, curr) => {
            return acc + curr.value;
          }, 0) ?? 0;

        },
        error: err => {

          console.log("Falha expenseSurvey", err)

        }
      })
  }


  getBadge(status) {


    if (status == 'PENDING') {
      
      return 'warning';
    }

    if (status == 'CONCLUDED') {
      
      return 'success';
    }


    return 'dark';

  }

  onConfirmPaymentSelected(expense: any) {
    this.confirmPaymentForm.controls['value_paid'].setValue(expense?.value)
    this.confirmPaymentForm.controls['paid_at'].setValue((new Date)?.toJSON()?.slice(0, 10))

    this.expenseSelected = expense
  }

  paidExpense() {
    this.submittedExpense = true
    this.successExpense = false;

    if (this.confirmPaymentForm.invalid)
      return;

    
    const data = this.confirmPaymentForm.value
    
    this.expenseService.confirmPayment(this.expenseSelected?.id, data )
      .subscribe({
        next: (resIncome : any[]) => {


          this.toastr.success("Receita paga com sucesso!", "Receita")

          this.getServiceExpenses()


        },
        error: err => {

          this.toastr.error("Falha ao pagar Receita!", "Receita")

          console.log("error", err)
        }
      })

    
  }


  setSurveySelected(serviceSurvey: any) {
    this.serviceSurveysSelected = serviceSurvey
  }

  setExpenseSelected(expense: any) {
    this.expenseSelected = expense
  }

  confirmationDelete() {
    this.fn(...this.paramsDelete);
  }

  private getDismissReason(reason: any): string {

    this.success = false;
    this.submitted = false;

    this.addServiceSurveys.reset()
    this.addServiceSurveys.setErrors(null)
    this.addServiceSurveys.controls['survey_at'].setValue((new Date)?.toJSON()?.slice(0, 10))

    this.addExpenses.reset()
    this.addExpenses.setErrors(null)

    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  back() {
    this.location.back()
  }

}

