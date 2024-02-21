import { Component, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-charge',
  templateUrl: './charge.component.html',
  styleUrls: ['./charge.component.scss']
})
export class ChargeComponent {

  closeResult: string = '';
  public addServiceSurveys: FormGroup;
  public confirmPaymentForm: FormGroup;
  public sumary: any;
  public serviceSurveys: any[];
  public services: any[];
  public charge_id: number;

  public submitted: Boolean;
  public success: Boolean;

  public serviceSurveySelected: any;
  public surveysSelected: any = [];
  public serviceSelected: any;

  fn: any;
  paramsDelete: any;

  constructor(
    private modalService: NgbModal,
    private location: Location,
    private router: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.confirmPaymentForm = new FormGroup({
      value_paid: new FormControl(null, [Validators.required]),
      paid_at: new FormControl(null, [Validators.required]),
    })

    this.charge_id = this.router.snapshot.params['id']

    this.getServiceSurveys();
  }

  get paymentForm() {
    return this.confirmPaymentForm.controls
  }

  open(content: any, fn = null, ...params: any[]) {
    const sizeModal = content?._declarationTContainer?.localNames?.[0] == 'addServiceSurvey' ? 'xl' : '';
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', 'centered': true, 'size': sizeModal }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

    //delete params
    this.fn = fn;
    this.paramsDelete = params;
  }


  addServices() {
    this.submitted = true
    this.success = false;

    console.log(this.surveysSelected)

    //Reset list e refresh nos dados
    this.surveysSelected = [];
    this.modalService.dismissAll()
  }

  setServiceSurveys() {
    this.surveysSelected = this.serviceSelected?.surveys?.filter(
      servSurv => servSurv?.billing_status == 'DRAFT' && servSurv?.is_checked
    )?.map(item => ({ id: item?.id, price: item?.price }))
  }

  setService(event: any) {
    this.serviceSelected = this.services.find(({ id }) => id == event.target.value)
  }

  setServiceSurvey(serviceSurvey: any) {
    this.serviceSurveySelected = serviceSurvey
  }

  removerServiceSurvey(id: Number) {

  }


  payCharger() {
    this.submitted = true
    this.success = false;

    if (this.confirmPaymentForm.invalid)
      return;

    const data = this.confirmPaymentForm.value
  }

  getServiceSurveys() {

    this.sumary = {
      id: 1,
      status: 'NOT_PAID',
      payment_type: 'INVOICE',
      value: 70.62,
      number: null,
      launch_at: '2024-02-16',
      due_at: '2024-02-20',
      paid_at: '2024-02-21',
      customer: {
        name: 'Seu José'
      },
    };

    this.serviceSurveys = [
      {
        id: 1,
        name: 'Vistoria 1',
        price: 25.72,
        survey_at: '2024-03-01',
        billing_status: 'PENDING',
        harbor_name: 'Navio 1',
        customer_name: 'Carlos',
      },
      {
        id: 2,
        name: 'Vistoria 2',
        price: 25.72,
        survey_at: '2024-03-01',
        billing_status: 'DRAFT',
        harbor_name: 'Navio 2',
        customer_name: 'Maria',
      },
      {
        id: 3,
        name: 'Vistoria 3',
        price: 25.72,
        survey_at: '2024-03-01',
        billing_status: 'CONCLUDED',
        harbor_name: 'Navio 3',
        customer_name: 'João',
      }
    ];

    this.services = [
      {
        id: 1,
        name: 'Atendimento 1',
        surveys: [
          {
            id: 1,
            name: 'Vistoria 1',
            price: 125.72,
            survey_at: '2024-03-01',
            billing_status: 'PENDING',
            harbor_name: 'Navio 1',
            customer_name: 'Carlos',
          },
          {
            id: 2,
            name: 'Vistoria 2',
            price: 35.72,
            survey_at: '2024-03-01',
            billing_status: 'DRAFT',
            harbor_name: 'Navio 2',
            customer_name: 'Maria',
          },
        ]
      },
      {
        id: 2,
        name: 'Atendimento 2',
        surveys: [
          {
            id: 1,
            name: 'Vistoria 11',
            price: 89.72,
            survey_at: '2024-03-01',
            billing_status: 'PENDING',
            harbor_name: 'Navio 1',
            customer_name: 'Carlos',
          },
          {
            id: 2,
            name: 'Vistoria 12',
            price: 45.72,
            survey_at: '2024-03-01',
            billing_status: 'DRAFT',
            harbor_name: 'Navio 2',
            customer_name: 'Maria',
          },
        ]
      },
    ];

    //manter apos chamada de API
    for (const service of this.services) {
      for (const survey of service?.surveys) {
        survey.is_checked = survey?.billing_status == 'DRAFT' ? false : true;
      }
    }
  }

  setCheckBox(event: any, serviceSurvey: any) {
    serviceSurvey.is_checked = event.target.checked;
  }

  confirmationDelete() {
    this.fn(...this.paramsDelete);
  }

  private getDismissReason(reason: any): string {

    this.success = false;
    this.submitted = false;

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

