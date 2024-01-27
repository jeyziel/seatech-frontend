import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { CustomerComponent } from './customer/customer.component';
import { HarborComponent } from './harbor/harbor.component';
import { SurveyComponent } from './survey/survey.component';
import { SurveyCategoryComponent } from './survey-category/survey-category.component';
import { IncomeCategoryComponent } from './income-category/income-category.component';
import { AccountComponent } from './account/account.component';
import { ExpenseCategoryComponent } from './expense-category/expense-category.component';


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
    ExpenseCategoryComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    DefaultLayoutModule,
    DashboardModule,
    SharedAppModule,
    BrowserAnimationsModule,
    NgbModule,
    ToastrModule.forRoot() 
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
    },],
  bootstrap: [AppComponent]
})
export class AppModule { }
