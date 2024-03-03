import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { CommonModule, registerLocaleData } from '@angular/common';
import { MainHeaderModule } from 'src/app/core/default-layout/main-header/main-header.module';
import { MainSidebarModule } from 'src/app/core/default-layout/main-sidebar/main-sidebar.module';
import { MainFooterModule } from 'src/app/core/default-layout/main-footer/main-footer.module';
import { ControlSidebarModule } from 'src/app/core/default-layout/control-sidebar/control-sidebar.module';
import { RankingAtendimentosComponent } from './components/ranking-atendimentos/ranking-atendimentos.component';
import { RankingCustomersComponent } from './components/ranking-customers/ranking-customers.component';
import { RankingSurveysComponent } from './components/ranking-surveys/ranking-surveys.component';
import { NgChartsModule } from 'ng2-charts';
import { ChartCategoriesComponent } from './components/chart-categories/chart-categories.component';
import { NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { ChartSurveysHarborComponent } from './components/chart-surveys-harbor/chart-surveys-harbor.component';
import { DashboardCustomerComponent } from './pages/dashboard-customer/dashboard-customer.component';
import localePt from '@angular/common/locales/pt';
import { FormsModule } from '@angular/forms';
import { ChartSurveysCustomerHarborComponent } from './pages/dashboard-customer/components/chart-surveys-harbor/chart-surveys-harbor.component';
import { SurveysCustomerComponent } from './pages/dashboard-customer/components/surveys-customers/surveys-customers.component';
import { RankingSurveysCustomerComponent } from './pages/dashboard-customer/components/ranking-surveys/ranking-surveys.component';
import { ChartCategoriesCustomerComponent } from './pages/dashboard-customer/components/chart-categories/chart-categories.component';
import { TranslatePipe } from 'src/app/pipes/translate.pipe';
import { SharedAppModule } from 'src/app/core/shared/shared.module';

registerLocaleData(localePt);


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ToastrModule.forRoot(),
   // BrowserAnimationsModule,
    NgChartsModule,
    MainHeaderModule,
    NgbDatepickerModule,
    MainSidebarModule,
    ControlSidebarModule,
    MainFooterModule,
    NgbModule,
    SharedAppModule,

    DashboardRoutingModule,

   

  ],
  declarations: [
    DashboardComponent, 

    DashboardCustomerComponent, 
    ChartCategoriesComponent, 
    

    RankingAtendimentosComponent,
     RankingCustomersComponent, 
     RankingSurveysComponent, 
     ChartSurveysHarborComponent, 

     //CUSTOMER

     ChartSurveysCustomerHarborComponent,
     SurveysCustomerComponent,
     RankingSurveysCustomerComponent,
     ChartSurveysCustomerHarborComponent,
     ChartCategoriesCustomerComponent,



  ]
})
export class DashboardModule {
}
