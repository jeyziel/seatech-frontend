import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';

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
  public serviceSurveys: any[];
  public expenses: any[];

  public surveys: any[];
  public harbors: any[];
  public customers: any[];
  public accounts: any[];
  public expenseCategorys: any[];

  public isPayment: Boolean = false;
  public submitted: Boolean;
  public success: Boolean;

  public serviceSurveysSelected: any;
  public expenseSelected: any;

  fn: any;
  paramsDelete: any;

  constructor(
    private modalService: NgbModal,
    private location: Location,
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
      type: new FormControl(null, [Validators.required]),
      account_id: new FormControl(null, [Validators.required]),
      expense_category_id: new FormControl(null, [Validators.required]),
      status: new FormControl(null, [Validators.required]),
      due_at: new FormControl(null, [Validators.required]),
      launch_at: new FormControl(null, [Validators.required]),
      value_paid: new FormControl(null, [Validators.nullValidator]),
      paid_at: new FormControl(null, [Validators.nullValidator]),
      discount: new FormControl(null, [Validators.nullValidator]),
      fines: new FormControl(null, [Validators.nullValidator]),
      isPayment: new FormControl(false, [Validators.nullValidator]),
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

    this.getServiceManagers();
  }

  get addServiceSurveyForm() {
    return this.addServiceSurveys.controls
  }

  get addExpenseForm() {
    return this.addExpenses.controls
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


  createServiceSurvey() {
    this.submitted = true
    this.success = false;
  }

  createExpense() {
    this.submitted = true
    this.success = false;
  }

  removerServiceSurvey(id: Number) {

  }

  removerExpense(id: Number) {

  }

  getServiceManagers() {
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
    ];
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
