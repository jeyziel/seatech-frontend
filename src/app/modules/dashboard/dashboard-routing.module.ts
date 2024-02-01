import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DashboardCustomerComponent } from './pages/dashboard-customer/dashboard-customer.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'cliente', component: DashboardCustomerComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
