import { Component, inject } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { CustomerService } from 'src/app/core/shared/services/customers.service';
import { DashboardCustomerService } from 'src/app/core/shared/services/dashboardCustomer.service';
import { DashboardGeralService } from 'src/app/core/shared/services/dashboardGeral.service';

@Component({
	selector: 'app-dashboard-customer',
	templateUrl: './dashboard-customer.component.html',
	styleUrls: ['./dashboard-customer.component.css']
})
export class DashboardCustomerComponent {


	calendar = inject(NgbCalendar);
	formatter = inject(NgbDateParserFormatter);

	today = new Date();
	hoveredDate: NgbDate | null = null;
	public fromDate: NgbDate | null;
	public toDate: NgbDate | null

	customers$: Observable<any>;

	public customer: any = ''
	public faturamentoGeral: Number = 0
	public faturamentoCustomer: Number = 0
	public incomesNotPaid: Number = 0

	constructor(
		private toastr: ToastrService,
		private customerService: CustomerService,
		private dashboardCustomerService: DashboardCustomerService,
		private dashboardService: DashboardGeralService

	) { }

	ngOnInit(): void {

		const today = new Date();
		const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
		const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

		this.fromDate = this.toNgbDate(firstDayOfMonth);
		this.toDate = this.toNgbDate(lastDayOfMonth);



		//this.getCustomers()

		this.customers$ = this.customerService.list()
		this.getIncomes()


	}

	getData() {

		this.getIncomes()
		this.getIncomesNotPaid()
		this.getExpenses()
		this.getSurveysPaid()
		this.getSurvey()


	}


	getCustomers() {


		this.customerService.list()
			.subscribe({
				next: (res: any) => {
					//this.customers = res 

				},
				error: err => {
					console.log("Falha ao buscar os clientes", err)
				}
			})



	}


	getIncomesGeral() {


		const params = this.getDate()

		this.dashboardService.getIncomesPaid(params)
			.subscribe({
				next: (resIncomesPaid: any[]) => {

					const incomes = resIncomesPaid

					this.faturamentoGeral = incomes?.reduce((acc, curr) => curr.total_value + acc, 0)

				}
			})

	}

	getIncomes() {


		const params = this.getDate()
		params["customer_id"] = this.customer

		this.dashboardCustomerService.getIncomesPaid(params)
			.subscribe({
				next: (resIncomesPaid: any[]) => {

					const incomes = resIncomesPaid

					this.faturamentoCustomer = incomes?.reduce((acc, curr) => curr.total_value + acc, 0)

				}
			})

	}

	getIncomesNotPaid() {


		const params = this.getDate()
		params["customer_id"] = this.customer


		this.dashboardCustomerService.getIncomesNotPaid(params)
			.subscribe({
				next: (resIncomeNotPaid: any[]) => {

					const incomeNotPaid = resIncomeNotPaid
					this.incomesNotPaid = incomeNotPaid?.reduce((acc, curr) => curr.total_value + acc, 0)

				}
			})


	}


	getExpenses() {


		const params = this.getDate()

		this.dashboardCustomerService.getExpensePaid(params)
			.subscribe({
				next: (resIncomesPaid: any[]) => {

					const incomes = resIncomesPaid

					this.faturamentoCustomer = incomes?.reduce((acc, curr) => curr.total_value + acc, 0)

				}
			})

	}


	getSurveysPaid() {

		const params = this.getDate()
		params["customer_id"] = this.customer

		this.dashboardCustomerService.getSurveysPaid(params)
			.subscribe({
				next: (resSurveyPaid: any[]) => {

					console.log("surveys Paid", resSurveyPaid)
					

				}
		})


	}

	getSurvey() {

		const params = this.getDate()
		params["customer_id"] = this.customer

		this.dashboardCustomerService.getSurveys(params)
			.subscribe({
				next: (resSurvey: any[]) => {

					console.log("surveys",  resSurvey)
					

				}
		})



	}




	public getDate() {

		return {
			"startDate": `${this.fromDate.year}-${this.fromDate.month.toString().padStart(2, '0')}-${this.fromDate.day.toString().padStart(2, '0')}`,
			"endDate": `${this.toDate.year}-${this.toDate.month.toString().padStart(2, '0')}-${this.toDate.day.toString().padStart(2, '0')}`,
		}



	}


	private toNgbDate(date: Date): NgbDate {
		return new NgbDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
	}



	onDateSelection(date: NgbDate) {
		if (!this.fromDate && !this.toDate) {
			this.fromDate = date;
		} else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
			this.toDate = date;
		} else {
			this.toDate = null;
			this.fromDate = date;
		}
	}

	dateSelect(fromDate, toDate) {



		const dateInit = `${fromDate.day}-${fromDate.month}-${fromDate.year}`

		return this.convertDateToBraziliamFormatter(this.formatter.format(fromDate))
			+ " - "
			+ this.convertDateToBraziliamFormatter(this.formatter.format(toDate))

	}

	convertDateToBraziliamFormatter(dataAmericana: string): string {

		if (!dataAmericana)
			return ""

		const [ano, mes, dia] = dataAmericana.split('-');
		const dataBrasileira = `${dia}-${mes}-${ano}`;


		return dataBrasileira;
	}

	isHovered(date: NgbDate) {
		return (
			this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
		);
	}

	isInside(date: NgbDate) {
		return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
	}

	isRange(date: NgbDate) {
		return (
			date.equals(this.fromDate) ||
			(this.toDate && date.equals(this.toDate)) ||
			this.isInside(date) ||
			this.isHovered(date)
		);
	}

	validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
		const parsed = this.formatter.parse(input);
		return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
	}

}
