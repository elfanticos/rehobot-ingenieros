import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-incidence-register',
  templateUrl: './modal-incidence-register.component.html',
  styleUrls: ['./modal-incidence-register.component.scss']
})
export class ModalIncidenceRegisterComponent implements OnInit {
  projectList: any[] = [];
  form: FormGroup;
  @Output() send: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    public dialogRef: MatDialogRef<ModalIncidenceRegisterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb: FormBuilder
  ) {
    // this.form = this._buildForm();
  }

  ngOnInit(): void {
  }

  // get name() { return this.form.controls['name']; }
  // get duration() { return this.form.controls['duration']; }
  // get address() { return this.form.controls['address']; }
  // get clients() { return this.form.controls['clients']; }

  onNoClick = (): void => { this.dialogRef.close(); }

  // private _buildForm(): FormGroup {
  //   const incidence: any = this.data.incidence || {};
  //   const inputs: any = {
  //     project: [incidence.project_id, [Validators.required]],
  //     duration: [project.duration, [Validators.required]],
  //     address: [project.address, [Validators.required]],
  //     clients: [clients]
  //   };

  //   return this._fb.group(inputs);
  // }

  submitForm(): void {
    this.send.emit(this.form.value);
  }
}
