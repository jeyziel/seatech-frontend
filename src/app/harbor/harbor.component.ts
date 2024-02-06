import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { HarborService } from '../core/shared/services/harbor.service';


@Component({
  selector: 'app-harbor',
  templateUrl: './harbor.component.html',
  styleUrls: ['./harbor.component.scss']
})
export class HarborComponent {

  closeResult: string = '';
  public addHarborsForm: FormGroup;
  public editHarborsForm: FormGroup;
  public harbors: any[];

  public submittedHarbor: Boolean;
  public successHarbor: Boolean;

  public harborSelected: any;

  fn: any;
  paramsDelete: any;

  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private harborService: HarborService
  ) { }


  ngOnInit(): void {

    this.addHarborsForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      state: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.nullValidator])
    })

    this.editHarborsForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      state: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.nullValidator])
    })

    this.getHarbors();
  }

  get addForm() {
    return this.addHarborsForm.controls
  }

  get editForm() {
    return this.editHarborsForm.controls
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
    this.submittedHarbor = true
    this.successHarbor = false;

    if (this.addHarborsForm.invalid)
      return;

    
    const data = this.addHarborsForm.value
    
    
    this.harborService.create(data)
      .subscribe({
        next: (res : any) => {

        
          this.toastr.success("Porto Cadastrado com sucesso", "Criar Porto")
        
          this.addHarborsForm.reset()
          this.addHarborsForm.clearValidators()

          this.submittedHarbor = false
          this.successHarbor = true;

        },
        error: err => {
          console.log("Falha ao realizar Login", err)
        }
      })


    
  }

  onEditHarbor(harbor: any) {
    this.editHarborsForm.controls['name'].setValue(harbor.name)
    this.editHarborsForm.controls['state'].setValue(harbor.state)
    this.editHarborsForm.controls['description'].setValue(harbor.description)

    this.harborSelected = harbor
  }

  update() {
    this.submittedHarbor = true
    this.successHarbor = false;

    if (this.editHarborsForm.invalid)
      return;


    const data = this.editHarborsForm.value

    this.harborService.update(this.harborSelected?.id, data)
        .subscribe({
          next: (res: any) => {
            
            this.toastr.success("Porto editado com sucesso!", "Cadastrar Porto")
         
            this.getHarbors()
          },
          error: err => {
            this.toastr.error("Falha ao editar porto", "Cadastrar Porto")
          }
        })
    
  }

  setHarborSelected(harbor: any) {
    this.harborSelected = harbor
  }

  removerHarbor(id: Number) {


    this.harborService.delete(id)
    .subscribe({
      next: (res : any) => {
        
        this.toastr.success("Porto deletado com sucesso!", "Deletar Porto")

        this.getHarbors()

      },
      error: err => {
        this.toastr.error("Falha ao deletar Porto!", "Deletar Porto")
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



    /*
    this.harbors = [
      {
        id: 1,
        name: 'Porto 1',
        state: 'Liberado',
        description: 'Descrição do primeiro Porto',
      },
      {
        id: 2,
        name: 'Porto 2',
        state: 'Fechado',
        description: 'Descrição do segundo Porto',
      },
      {
        id: 3,
        name: 'Porto 3',
        state: 'Fechado',
        description: 'Descrição do terceiro Porto',
      }
    ];*/
  }

  confirmationDelete() {
    this.fn(...this.paramsDelete);
  }

  private getDismissReason(reason: any): string {

    this.successHarbor = false;
    this.submittedHarbor = false;


    this.addHarborsForm.reset()
    this.addHarborsForm.setErrors(null)

    this.editHarborsForm.reset()
    this.editHarborsForm.setErrors(null)

    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
