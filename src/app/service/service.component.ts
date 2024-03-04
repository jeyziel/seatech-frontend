import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AtendimentoService } from '../core/shared/services/atendimento.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent {

  itemsPerPage: number = 10;
  currentPage: number = 1;
  seachText: string = '';
  closeResult: string = '';
  public addServicesForm: FormGroup;
  public editServicesForm: FormGroup;
  public services: any[] = [];

  public submittedService: Boolean;
  public successService: Boolean;

  public serviceSelected: any;

  fn: any;
  paramsDelete: any;

  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private atendimentoService: AtendimentoService,
    private router: Router
  ) { }


  ngOnInit(): void {

    this.addServicesForm = new FormGroup({
      ship_name: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.nullValidator]),
      status: new FormControl("IN_PROGRESS", [Validators.required])
    })

    this.editServicesForm = new FormGroup({
      ship_name: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.nullValidator]),
      status: new FormControl(null, [Validators.required])
    })

    this.getServices();
  }

  get addForm() {
    return this.addServicesForm.controls
  }

  get editForm() {
    return this.editServicesForm.controls
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
    this.submittedService = true
    this.successService = false;

    if (this.addServicesForm.invalid)
      return;

    const data = this.addServicesForm.value

    this.atendimentoService.create(data)
      .subscribe({
        next: res => {


          this.toastr.success("Atendimento criado com sucesso", "Atendimento")

          this.getServices()
        },
        error: err => {

          this.toastr.error("Falha ao buscar atendimento", "Atendimento")


        }
      })

  }

  onEditService(service: any) {
    this.editServicesForm.controls['ship_name'].setValue(service.ship_name)
    this.editServicesForm.controls['description'].setValue(service.description)
    this.editServicesForm.controls['status'].setValue(service.status)

    this.serviceSelected = service
  }

  onManagerService(service: any) {
    this.router.navigate(['atendimentos', service?.id, 'gerenciar']);
    // this.router.navigate(['atendimentos', service?.id, 'gerenciar']);
  }

  update() {
    this.submittedService = true
    this.successService = false;

    if (this.editServicesForm.invalid)
      return;

    const data = this.editServicesForm.value

    this.atendimentoService.update(this.serviceSelected?.id, data)
      .subscribe({
        next: res => {


          this.toastr.success("Atendimento atualizado com sucesso", "Atendimento")

          this.getServices()
        },
        error: err => {

          this.toastr.error("Falha ao buscar atendimento", "Atendimento")


        }
      })
  }

  setServiceSelected(service: any) {
    this.serviceSelected = service
  }

  removerService(id: Number) {


    this.atendimentoService.delete(id)
      .subscribe({
        next: (res: any[]) => {

          this.toastr.success("Atendimento excluído com sucesso", "Excluir Atendimento");

        },
        error: err => {
          this.toastr.error("Falha ao remover atendimento", "Atendimentos")
        }
      })


  }

  async getServices() {


    this.atendimentoService.list()
      .subscribe({
        next: (res: any[]) => {
          this.services = res
        },
        error: err => {
          this.toastr.error("Falha ao buscar atendimento", "Atendimentos")
        }
      })


    /*
    const auxList = [
      {
        id: 1,
        ship_name: 'Navio Pequeno',
        description: 'Desc Operacional',
        status: 'IN_PROGRESS',
        created_at: '2024-01-01 10:36:15',
      },
      {
        id: 2,
        ship_name: 'Navio Grande',
        description: 'Desc Operacional',
        status: 'FINISHED',
        created_at: '2024-01-02 10:36:15',
      },
      {
        id: 3,
        ship_name: 'Navio Muito Grande',
        description: 'Desc Não Operacional',
        status: 'CANCELLED',
        created_at: '2024-01-03 10:36:15',
      },
    ];

    for (let i = 0; i < 25; i++) {
      const position = (Math.random() * (auxList.length - 1)).toFixed();
      this.services.push(auxList[position])
    }*/


  }

  confirmationDelete() {
    this.fn(...this.paramsDelete);
  }

  private getDismissReason(reason: any): string {

    this.successService = false;
    this.submittedService = false;


    this.addServicesForm.reset()
    this.addServicesForm.setErrors(null)

    this.editServicesForm.reset()
    this.editServicesForm.setErrors(null)

    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}


