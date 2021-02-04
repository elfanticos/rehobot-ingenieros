import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { CalendarDateFormatter} from 'angular-calendar';
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { CsCalendarDateFormatter } from 'src/app/core/helpers/cs-calendar-date-formatter.provider';
import * as moment from 'moment';
// MAT_MOMENT_DATE_FORMATS.display.dateInput = 'DD/MM/YYYY';
// MAT_MOMENT_DATE_FORMATS.parse.dateInput = 'DD/MM/YYYY';

@Component({
  selector: 'app-modal-user-register',
  templateUrl: './modal-user-register.component.html',
  styleUrls: ['./modal-user-register.component.scss'],
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
export class ModalUserRegisterComponent implements OnInit {
  roleList: any[] = [];
  form: FormGroup;
  @Output() send: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    public dialogRef: MatDialogRef<ModalUserRegisterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb: FormBuilder
  ) {
    this.form = this._buildForm();
  }

  ngOnInit(): void {
  }

  get user() { return this.form.controls['user']; }
  get role() { return this.form.controls['role']; }
  get full_name() { return this.form.controls['full_name']; }
  get active() { return this.form.controls['active']; }
  get description() { return this.form.controls['description']; }

  onNoClick = (): void => { this.dialogRef.close(); }

  private _buildForm(): FormGroup {
    const user: any = this.data.user || {};
    
    const inputs: any = {
      user: [user.user, [Validators.required]],
      role: [user.role_id, [Validators.required]],
      full_name: [user.full_name, [Validators.required]],
      active: [user.active],
      description: [user.description]
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
