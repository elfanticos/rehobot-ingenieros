import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { COMBO_STATE } from '../../constants/incidence-constant';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { CalendarDateFormatter} from 'angular-calendar';
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { CsCalendarDateFormatter } from 'src/app/core/helpers/cs-calendar-date-formatter.provider';
import * as moment from 'moment';
// MAT_MOMENT_DATE_FORMATS.display.dateInput = 'DD/MM/YYYY';
// MAT_MOMENT_DATE_FORMATS.parse.dateInput = 'DD/MM/YYYY';

@Component({
  selector: 'app-modal-incidence-register',
  templateUrl: './modal-incidence-register.component.html',
  styleUrls: ['./modal-incidence-register.component.scss'],
  providers: [
    {
        provide: CalendarDateFormatter,
        useClass: CsCalendarDateFormatter
    },
    {
        provide: MAT_DATE_FORMATS,
        useValue: MAT_MOMENT_DATE_FORMATS
    },
    {
        provide: MAT_DATE_LOCALE,
        useValue: 'es-ES'
    },
    {
        provide: DateAdapter,
        useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]
    }]
})
export class ModalIncidenceRegisterComponent implements OnInit {
  projectList: any[] = [];
  form: FormGroup;
  COMBO_STATE = COMBO_STATE;
  @Output() send: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    public dialogRef: MatDialogRef<ModalIncidenceRegisterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb: FormBuilder
  ) {
    this.form = this._buildForm();
  }

  ngOnInit(): void {
  }

  get project() { return this.form.controls['project']; }
  get description() { return this.form.controls['description']; }
  get state() { return this.form.controls['state']; }
  get solution() { return this.form.controls['solution']; }
  get dateResponse() { return this.form.controls['dateResponse']; }

  onNoClick = (): void => { this.dialogRef.close(); }

  private _buildForm(): FormGroup {
    const incidence: any = this.data.incidence || {};
    
    const inputs: any = {
      project: [incidence.project_id, [Validators.required]],
      description: [incidence.description, [Validators.required]],
      state: [incidence.state, [Validators.required]],
      solution: [incidence.solution],
      dateResponse: [incidence.date_response]
    };
    return this._fb.group(inputs);
  }

  submitForm(): void {
    const values = this.form.value;
    if (values.dateResponse) {
      values.dateResponse = moment(values.dateResponse).add(2, 'hours').toDate();
    }

    console.log(this.form.value);
    this.send.emit(this.form.value);
  }
}
