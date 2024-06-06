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

	public surveysPaid: any[] = []
	public incomesSurveyPaid: Number = 0
	public incomesSurveyContribuiton: Number = 0

	public surveysRecorrentes: any[] = []
	public surveysHarbors: any[] = []

	public surveyGrouppedByName : any[] = []
	public surveyGrouppedCategories : any[] = []

	public surveys: any[] = []

	public loading = false;

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


		this.customers$ = this.customerService.list()
		


	}

	getData() {

		this.loading = false;

		this.getIncomes()
		this.getIncomesNotPaid()

		this.getSurveysPaid()
		this.getSurvey()


	}


	public getDate() {

		return {
			"startDate": `${this.fromDate.year}-${this.fromDate.month.toString().padStart(2, '0')}-${this.fromDate.day.toString().padStart(2, '0')}`,
			"endDate": `${this.toDate.year}-${this.toDate.month.toString().padStart(2, '0')}-${this.toDate.day.toString().padStart(2, '0')}`,
		}



	}


	getIncomesGeral() {


		const params = this.getDate()

		this.dashboardService.getIncomesPaid(params)
			.subscribe({
				next: (resIncomesPaid: any[]) => {

					const incomes = resIncomesPaid

					this.faturamentoGeral = incomes?.reduce((acc, curr) => curr.total_value + acc, 0)


					this.incomesSurveyContribuiton = this.surveysPaid?.reduce((acc, curr) => curr.contribuiton_percentage + acc, 0)

					console.log("porcentagem de contribuição", this.incomesSurveyContribuiton )


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

					this.faturamentoCustomer = incomes?.reduce((acc, curr) => ( curr.total_value) + acc, 0)
					this.incomesSurveyContribuiton = resIncomesPaid?.reduce((acc, curr) => curr.contribution_percentage + acc, 0)


					console.log("incomes contribuition", this.incomesSurveyContribuiton)
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




	getSurveysPaid() {

		const params = this.getDate()
		params["customer_id"] = this.customer

		this.dashboardCustomerService.getSurveysPaid(params)
			.subscribe({
				next: (resSurveyPaid: any[]) => {

					this.surveysPaid = resSurveyPaid

					this.surveysHarbors = this.getIncomeByHarbors(this.surveysPaid)
					this.surveyGrouppedByName = this.grouppedSurveyIncome(this.surveysPaid )
					this.surveyGrouppedCategories = this.grouppedSurveyCategory(this.surveysPaid)

					

					this.loading = true
					

				}
		})


	}

	getSurvey() {

		const params = this.getDate()
		params["customer_id"] = this.customer

		this.dashboardCustomerService.getSurveys(params)
			.subscribe({
				next: (resSurvey: any[]) => {

					this.surveys = resSurvey

					this.surveysRecorrentes = this.groupSurveysAndCalculate(this.surveys)


				},
				error: err => {
					this.toastr.error("Falha ao buscar vistórias", "Vistorias")
				}
		})



	}


	groupSurveysAndCalculate(data) {

		const grouped = {};

		data.forEach(item => {
			if (!grouped[item.survey_id]) {
				grouped[item.survey_id] = {
					survey_id: item.survey_id,
					name: item.name,
					quantidade: 0,
					total_faturado: 0,
					total_recebido: 0
				};
			}
			grouped[item.survey_id].quantidade++;
			grouped[item.survey_id].total_faturado += item.price * item.currency_rate;

			if (item.billing_status === "CONCLUDED") {
				grouped[item.survey_id].total_recebido += item.price * item.currency_rate;
			}
		});
		return Object.values(grouped);
	}

	getIncomeByHarbors(surveys: any[]) {

		

		const resultado = [];

		surveys.forEach(item => {
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
			const price = item.price * item.currency_rate;
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



	grouppedSurveyIncome(data) {

		const surveys = {};
	
		data.forEach(item => {
			const surveyId = item.survey.id;
			const surveyName = item.survey.name;
			const price = item.price * item.currency_rate;
	
			// Se o survey_id ainda não existir no objeto surveys, inicialize-o
			if (!surveys[surveyId]) {
				surveys[surveyId] = {
					survey_id: surveyId,
					category_name: surveyName,
					total_value: 0,
					quantidade: 0
				};
			}
	
			// Atualizar o total e a quantidade para o survey_id atual
			surveys[surveyId].total_value += price;
			surveys[surveyId].quantidade++;
		});
	
		// Converter o objeto de surveys de volta para um array
		const result = Object.values(surveys);
	
		return result;
	}

	grouppedSurveyCategory(data) {

		const categoriesSurveys = {};
	
		data.forEach(item => {
			const categoryID = item.survey.categories.id;
			const surveyCategoryName = item.survey.categories.name;
			const price = item.price * item.currency_rate;
	
			// Se o survey_id ainda não existir no objeto surveys, inicialize-o
			if (!categoriesSurveys[categoryID]) {
				categoriesSurveys[categoryID] = {
					survey_id: categoryID,
					category_name: surveyCategoryName,
					total_value: 0,
					quantidade: 0
				};
			}
	
			// Atualizar o total e a quantidade para o survey_id atual
			categoriesSurveys[categoryID].total_value += price;
			categoriesSurveys[categoryID].quantidade++;
		});
	
		// Converter o objeto de surveys de volta para um array
		const result = Object.values(categoriesSurveys);
	
		return result;
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
