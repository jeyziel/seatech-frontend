import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-survey-category',
  templateUrl: './survey-category.component.html',
  styleUrls: ['./survey-category.component.scss']
})
export class SurveyCategoryComponent {

  closeResult: string = '';
  public addSurveyCategorysForm: FormGroup;
  public editSurveyCategorysForm: FormGroup;
  public surveyCategorys: any[];

  public submittedSurveyCategory: Boolean;
  public successSurveyCategory: Boolean;

  public surveyCategorySelected: any;

  fn: any;
  paramsDelete: any;

  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    this.addSurveyCategorysForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.nullValidator])
    })

    this.editSurveyCategorysForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.nullValidator])
    })

    this.getSurveyCategorys();
  }

  get addForm() {
    return this.addSurveyCategorysForm.controls
  }

  get editForm() {
    return this.editSurveyCategorysForm.controls
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
    this.submittedSurveyCategory = true
    this.successSurveyCategory = false;

    if (this.addSurveyCategorysForm.invalid)
      return;
  }

  onEditSurveyCategory(surveyCategory: any) {
    this.editSurveyCategorysForm.controls['name'].setValue(surveyCategory.name)

    this.surveyCategorySelected = surveyCategory
  }

  update() {
    this.submittedSurveyCategory = true
    this.successSurveyCategory = false;

    if (this.editSurveyCategorysForm.invalid)
      return;
  }

  setSurveyCategorySelected(surveyCategory: any) {
    this.surveyCategorySelected = surveyCategory
  }

  removerSurveyCategory(id: Number) {

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

    this.successSurveyCategory = false;
    this.submittedSurveyCategory = false;


    this.addSurveyCategorysForm.reset()
    this.addSurveyCategorysForm.setErrors(null)

    this.editSurveyCategorysForm.reset()
    this.editSurveyCategorysForm.setErrors(null)

    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}


