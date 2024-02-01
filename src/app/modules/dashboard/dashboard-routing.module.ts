import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DashboardCustomerComponent } from './pages/dashboard-customer/dashboard-customer.component';
import { authGuard } from '../auth/guards/auth.guard';

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'cliente', component: DashboardCustomerComponent, canActivate: [authGuard] },
  {
    path: '',
    redirectTo: 'dashboard',

    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
