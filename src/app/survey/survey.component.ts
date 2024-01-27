import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent {

  closeResult: string = '';
  public addSurveysForm: FormGroup;
  public editSurveysForm: FormGroup;
  public surveys: any[];
  public surveyCategorys: any[];

  public submittedSurvey: Boolean;
  public successSurvey: Boolean;

  public surveySelected: any;

  fn: any;
  paramsDelete: any;

  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService
  ) { }


  ngOnInit(): void {

    this.addSurveysForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      default_value: new FormControl(null, [Validators.required]),
      survey_category_id: new FormControl(null, [Validators.required]),
    })

    this.editSurveysForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      default_value: new FormControl(null, [Validators.required]),
      survey_category_id: new FormControl(null, [Validators.nullValidator])
    })

    this.getSurveys();
    this.getSurveyCategorys();
  }

  get addForm() {
    return this.addSurveysForm.controls
  }

  get editForm() {
    return this.editSurveysForm.controls
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
    this.submittedSurvey = true
    this.successSurvey = false;

    if (this.addSurveysForm.invalid)
      return;
  }

  onEditSurvey(survey: any) {
    this.editSurveysForm.controls['name'].setValue(survey.name)
    this.editSurveysForm.controls['default_value'].setValue(survey.default_value)
    this.editSurveysForm.controls['survey_category_id'].setValue(survey.survey_category_id)

    this.surveySelected = survey
  }

  update() {
    this.submittedSurvey = true
    this.successSurvey = false;

    if (this.editSurveysForm.invalid)
      return;
  }

  setSurveySelected(survey: any) {
    this.surveySelected = survey
  }

  removerSurvey(id: Number) {

  }

  getSurveys() {
    this.surveys = [
      {
        id: 1,
        name: 'Vistoria 1',
        default_value: 25.6,
        survey_category_id: 2,
        survey_category: {
          id: 2,
          name: 'Categoria de Receita 2',
        }
      },
      {
        id: 2,
        name: 'Vistoria 2',
        default_value: 32.99,
        survey_category_id: 1,
        survey_category: {
          id: 1,
          name: 'Categoria de Receita 1',
        }
      }
    ];
  }

  getSurveyCategorys() {
    this.surveyCategorys = [
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

    this.successSurvey = false;
    this.submittedSurvey = false;


    this.addSurveysForm.reset()
    this.addSurveysForm.setErrors(null)

    this.editSurveysForm.reset()
    this.editSurveysForm.setErrors(null)

    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
