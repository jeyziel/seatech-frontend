import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiHandlerService } from 'src/app/core/shared/utils/api-handler.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardCustomerService {

  constructor(
    private http: HttpClient
  ){}

 
  getIncomesPaid(params) {
    return this.http.get(`${environment.api_url}/dashboard-customer/incomes-paid`, {params})
  }

 
  getIncomesNotPaid(params) {
    return this.http.get(`${environment.api_url}/dashboard-customer/incomes-not-paid`, { params })
  }

  getExpensePaid(params) {
    return this.http.get(`${environment.api_url}/dashboard-customer/expenses-paid`, { params })
  }

  getSurveysPaid(params) {
    return this.http.get(`${environment.api_url}/dashboard-customer/surveys-paid`, { params })
  }

  getSurveys(params) {
    return this.http.get(`${environment.api_url}/dashboard-customer/surveys`, { params })
  }



  /**
   * 
   *    Route::get("/dashboard/incomes-paid", [DashboardController::class, 'incomesPaid']);
   *    Route::get("/dashboard/incomes-not-paid", [DashboardController::class, 'incomesNotPaid']);
   *
   *     Route::get("/dashboard/expenses-paid", [DashboardController::class, 'expensePaid']);
   *
   *     Route::get("/dashboard/surveys-paid", [DashboardController::class, 'surveyPaid']); 
   *     Route::get("/dashboard/services-finished", [DashboardController::class, 'servicesFinished']); 
   * 
   * 
   */



  


}