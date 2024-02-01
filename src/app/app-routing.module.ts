import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './modules/auth/guards/auth.guard';
import { DefaultLayoutComponent } from './core/default-layout/default-layout.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { ResetPasswordComponent } from './modules/auth/reset-password/reset-password.component';
import { CustomerComponent } from './customer/customer.component';
import { SurveyComponent } from './survey/survey.component';
import { SurveyCategoryComponent } from './survey-category/survey-category.component';
import { ExpenseCategoryComponent } from './expense-category/expense-category.component';
import { HarborComponent } from './harbor/harbor.component';
import { IncomeCategoryComponent } from './income-category/income-category.component';
import { AccountComponent } from './account/account.component';
import { ServiceComponent } from './service/service.component';
import { ServiceManagerComponent } from './service-manager/service-manager.component';
import { BillsToReceiveComponent } from './bills-to-receive/bills-to-receive.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    // canActivate: [authGuard],
    data: {
      title: 'Home'
    },
    children: [
      { path: 'usuarios', loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule) },
      {
        path: 'clientes',
        component: CustomerComponent,
      },
      {
        path: 'vistorias',
        component: SurveyComponent,
      },
      {
        path: 'atendimentos',
        component: ServiceComponent,
      },
      {
        path: 'atendimentos/:id/gerenciar',
        component: ServiceManagerComponent,
      },
      {
        path: 'categoria-de-vistoria',
        component: SurveyCategoryComponent,
      },
      {
        path: 'categoria-de-despesa',
        component: ExpenseCategoryComponent,
      },
      {
        path: 'portos',
        component: HarborComponent,
      },
      {
        path: 'contas-a-receber',
        component: BillsToReceiveComponent,
      },
      {
        path: 'categoria-de-receita',
        component: IncomeCategoryComponent,
      },
      {
        path: 'contas-bancarias',
        component: AccountComponent,
      },
      {
        path: 'widgets',
        loadChildren: () =>
          import('./modules/common/widgets/widgets.module').then((m) => m.WidgetsModule)
      },
      {
        path: 'simple-table',
        loadChildren: () =>
          import('./modules/common/tables/simple-table/simple-table.module').then((m) => m.DataTableModule)
      },
      { path: 'vistorias', loadChildren: () => import('./modules/common/pages/surveys/surveys.module').then(m => m.SurveyModule) },
      { path: 'dashboard', loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule) },

    ]
  },
  {
    path: 'login',
    // canActivate: [authGuard],
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    data: {
      title: 'Reset Password Page'
    }
  },
  {path: '**', redirectTo: 'dashboard'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
