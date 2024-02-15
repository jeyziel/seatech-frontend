import { ChangeDetectorRef, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ng-date-range-picker',
  templateUrl: './ng-date-range-picker.component.html',
  styleUrls: ['./ng-date-range-picker.component.css']
})
export class NgDateRangePickerComponent {
  calendar = inject(NgbCalendar);
  formatter = inject(NgbDateParserFormatter);

  today = new Date();
  hoveredDate: NgbDate | null = null;

  @Input() fromDate: NgbDate | null
  @Input() toDate: NgbDate | null
  @Output() fromDateChange = new EventEmitter<NgbDate>();
  @Output() toDateChange = new EventEmitter<NgbDate>();

  firstInteract: boolean = true

  constructor(private cd: ChangeDetectorRef) { }


  ngOnInit(): void {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    this.fromDate = this.toNgbDate(firstDayOfMonth);
    this.toDate = this.toNgbDate(lastDayOfMonth);
    this.cd.detectChanges();
  }

  ngAfterViewInit() {

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

    this.debounce(() => {
      this.fromDateChange.emit(this.fromDate);
      this.toDateChange.emit(this.toDate);
    }, 400)()
  }

  dateSelect(fromDate, toDate) {

    if (this.firstInteract) {
      this.firstInteract = false;

      this.debounce(() => {
        this.fromDateChange.emit(fromDate);
        this.toDateChange.emit(toDate);
      }, 400)()
    }

    return this.convertDateToBraziliamFormatter(this.formatter.format(fromDate))
      + " - "
      + this.convertDateToBraziliamFormatter(this.formatter.format(toDate));
  }


  debounce<T extends (...args: any[]) => any>(func: T, delay: number): (...args: Parameters<T>) => void {
    let timerId: ReturnType<typeof setTimeout>;

    return (...args: Parameters<T>): void => {
      clearTimeout(timerId);
      timerId = setTimeout(() => func.apply(null, args), delay);
    };
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
    console.log('validateInput', this.fromDate)
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }

}
