import { Component, OnInit, inject } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  calendar = inject(NgbCalendar);
  formatter = inject(NgbDateParserFormatter);

  today = new Date();
  hoveredDate: NgbDate | null = null;
  public fromDate: NgbDate | null;
  public toDate: NgbDate | null


  constructor(private toastr: ToastrService) { }

  ngOnInit(): void {

	const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    this.fromDate = this.toNgbDate(firstDayOfMonth);
    this.toDate = this.toNgbDate(lastDayOfMonth);




   

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
		
		const [ ano, mes, dia] = dataAmericana.split('-');
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
