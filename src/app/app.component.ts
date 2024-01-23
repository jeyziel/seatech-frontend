import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'lte-angular';

  constructor(private toastr: ToastrService){}

  ngOnInit(){
    this.toastr.success('Falha ao cadastrar Atividade ', 'ERRO');
  }
}
