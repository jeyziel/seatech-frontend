import { Component, OnInit, inject } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DashboardGeralService } from 'src/app/core/shared/services/dashboardGeral.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

	public loading = false;

	calendar = inject(NgbCalendar);
	formatter = inject(NgbDateParserFormatter);

	today = new Date();
	hoveredDate: NgbDate | null = null;
	public fromDate: NgbDate | null;
	public toDate: NgbDate | null

	public incomesPaid : any[] = []
	public expensesPaid : any[] = []
	public services: any[] = []

	public faturamento: number = 0
	public despesas: number = 0

	public surveys: any[] = []
	public surveysHarbors: any[] = []
	public customerSurvey: any[] = []
	public servicesFinished: any[] = []

	public data : any[]

	constructor(
		private toastr: ToastrService,
		private dashboardService: DashboardGeralService
	) { }

	ngOnInit(): void {

		const today = new Date();
		const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
		const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

		this.fromDate = this.toNgbDate(firstDayOfMonth);
		this.toDate = this.toNgbDate(lastDayOfMonth);


		this.getData()
		


	}


	private toNgbDate(date: Date): NgbDate {
		return new NgbDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
	}

	getData() {

		console.log("Datas", this.fromDate, this.toDate)

		this.getIncomesPaid()
		this.getExpensePaid()
		this.getSurveysPaid()
		this.getServicesFinished()


	}

	getIncomesPaid() {


		const params = this.getDate()

		this.dashboardService.getIncomesPaid(params)
			.subscribe({
				next: (resIncomesPaid: any[]) => {
					this.incomesPaid = resIncomesPaid

					this.faturamento = this.incomesPaid?.reduce( (acc, curr) => curr.total_value + acc, 0)

				}
			})



	}

	getExpensePaid() {


		const params = this.getDate()

		this.dashboardService.getExpensePaid(params)
			.subscribe({
				next: (resExpensePaid : any[]) => {
				
					this.expensesPaid = resExpensePaid
					this.despesas = this.expensesPaid?.reduce( (acc, curr) => curr.total_value + acc, 0)

				}
			})

	}

	getSurveysPaid() {


		const params = this.getDate()

		this.dashboardService.getSurveysPaid(params)
			.subscribe({
				next: (resSurveyPaid: any[] )=> {
					this.surveys = resSurveyPaid

					this.surveysHarbors = this.getIncomeByHarbors()


					this.customerSurvey = this.getSurveyByCustomer()

				}
			})

	}

	getServicesFinished() {


		const params = this.getDate()

		this.dashboardService.getServicesFinished(params)
			.subscribe({
				next: (resServiceFinished : any[] ) => {
					this.services = resServiceFinished

					this.transformServiceFinished()

					this.loading =  true
				}
			})

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

	getDate(){

		return {
			"startDate": `${this.fromDate.year}-${this.fromDate.month.toString().padStart(2, '0')}-${this.fromDate.day.toString().padStart(2, '0')}`,
			"endDate": `${this.toDate.year}-${this.toDate.month.toString().padStart(2, '0')}-${this.toDate.day.toString().padStart(2, '0')}`,
		}


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


	transformServiceFinished() {

		this.services.forEach(servico => {
			const shipName = servico.ship_name;
			const clientesUnicos = new Set();
			let qtdVistorias = 0;
			let precoVistorias = 0;
			let precoDespesas = 0;
			let vistoriasFaturas = 0;
		  
			// Iterando sobre as pesquisas do serviço
			servico.service_survey.forEach(item  => {
			  clientesUnicos.add(item.customer_id);
			  qtdVistorias++;
			  precoVistorias += item.price;

			  if (item.billing_status == "CONCLUDED") vistoriasFaturas++

			});


		  
			// Calculando o preço total
			servico.expenses.forEach(expense => {
				precoDespesas += expense.value;
			});
		  
			// Adicionando as informações do serviço à estrutura
			this.servicesFinished.push({
			  shipName,
			  qtdClientesUnicos: clientesUnicos.size,
			  qtdVistorias,
			  vistoriasFaturas,
			  precoVistorias,
			  precoDespesas
			});
		  });

		return this.servicesFinished

	}


	getSurveyByCustomer() {

		

		const resultado = [];

		this.surveys.forEach(item => {
			// Obtendo o nome do porto
			const customerName = item.customer.name 

			if (!resultado[customerName]) {
				resultado[customerName] = {
					name: customerName,
					price : item.price
				};

				
			}else{
				resultado[customerName].price += item.price

			}

	


				
		});


	
		const customers = [];

		// Iterando sobre as chaves do objeto original
		for (const key in resultado) {
		// Verificando se a chave é uma propriedade própria do objeto (não herdada)
			if (resultado.hasOwnProperty(key)) {
				// Adicionando cada valor correspondente ao array de resultados
				
				customers.push(resultado[key]);
			}
		}

		
		return customers


	}


	getIncomeByHarbors() {

		

		const resultado = [];

		this.surveys.forEach(item => {
			// Obtendo o nome do porto
			const harborName = item.harbor.name 

			if (!resultado[harborName]) {
				resultado[harborName] = {
					harbor_name: harborName,
					surveys: []
				};
			}

			// Obtendo o nome da pesquisa e o preço
			const surveyName = item.survey.name;
			const price = item.price;
			const id = item.survey.id;


			if (!resultado[harborName].surveys[id]) {
				resultado[harborName].surveys[id] = {
					id: id,
					name: surveyName,
					price: price,
					qtd: 1
				} 
			}else{
				resultado[harborName].surveys[id].price += price
				resultado[harborName].surveys[id].qtd += 1
			}

				
		});


	
		const harbors = [];

		// Iterando sobre as chaves do objeto original
		for (const key in resultado) {
		// Verificando se a chave é uma propriedade própria do objeto (não herdada)
			if (resultado.hasOwnProperty(key)) {
				// Adicionando cada valor correspondente ao array de resultados
				resultado[key].surveys = Object.values(resultado[key].surveys)
				harbors.push(resultado[key]);
			}
		}

		

		return harbors


	}

}
