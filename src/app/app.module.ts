import { LOCALE_ID, NgModule } from '@angular/core';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DefaultLayoutModule } from './core/default-layout/default-layout.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { LoginComponent } from './modules/auth/login/login.component';
import { SharedAppModule } from './core/shared/shared.module';
import { RegisterComponent } from './modules/auth/register/register.component';
import { ResetPasswordComponent } from './modules/auth/reset-password/reset-password.component';
import { FeatureGuard } from './core/permission/guards/feature.guard';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './core/shared/interceptors/auth.interceptor';
import { NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

import { CustomerComponent } from './customer/customer.component';
import { HarborComponent } from './harbor/harbor.component';
import { SurveyComponent } from './survey/survey.component';
import { SurveyCategoryComponent } from './survey-category/survey-category.component';
import { IncomeCategoryComponent } from './income-category/income-category.component';
import { AccountComponent } from './account/account.component';
import { ExpenseCategoryComponent } from './expense-category/expense-category.component';
import localePt from '@angular/common/locales/pt';
import { HashLocationStrategy, LocationStrategy, registerLocaleData } from '@angular/common';

import { CommonModule } from '@angular/common';

import { ServiceComponent } from './service/service.component';
import { TranslatePipe } from './pipes/translate.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchPipe } from './pipes/search.pipe';
import { ServiceManagerComponent } from './service-manager/service-manager.component';
import { BillsToReceiveComponent } from './bills-to-receive/bills-to-receive.component';
import { DateRangePickerComponent } from './components/date-range-picker/date-range-picker.component';
import { BillsToPayComponent } from './bills-to-pay/bills-to-pay.component';
import { NgDateRangePickerComponent } from './components/ng-date-range-picker/ng-date-range-picker.component';
import { ChargeComponent } from './charge/charge.component';
import { ProfileComponent } from './profile/profile.component';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
    CustomerComponent,
    HarborComponent,
    SurveyComponent,
    SurveyCategoryComponent,
    IncomeCategoryComponent,
    AccountComponent,
    ExpenseCategoryComponent,
    ServiceComponent,
   
    ServiceManagerComponent,
    BillsToReceiveComponent,
    BillsToPayComponent,
    DateRangePickerComponent,
    NgDateRangePickerComponent,
    ChargeComponent,
    ProfileComponent,
   
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    DefaultLayoutModule,
    SharedAppModule,
    DashboardModule,
    BrowserAnimationsModule,
    NgbModule,
    ToastrModule.forRoot(),
    NgxPaginationModule,
    NgbDatepickerModule,
  ],
  providers: [
    FeatureGuard,
    // {
    //   provide: LocationStrategy,
    //   useClass: HashLocationStrategy
    // },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    { provide: LOCALE_ID, useValue: "pt-BR"},
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
