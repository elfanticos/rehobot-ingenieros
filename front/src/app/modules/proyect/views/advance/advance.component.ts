import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackBarService } from '@app/core/services/snackbar.service';
import { ComboService } from 'src/app/core/services/combo.service';
import { AdvanceFacadeService } from '../../shared/services/advance.service';

@Component({
  selector: 'app-advance',
  templateUrl: './advance.component.html',
  styleUrls: ['./advance.component.scss']
})
export class AdvanceComponent implements OnInit {
  projectList: any[] = [];
  form: FormGroup;
  service: boolean = false;
  constructor(
    private _fb: FormBuilder,
    private _comboService: ComboService,
    private _advanceService: AdvanceFacadeService,
    private _snackBarService: SnackBarService
  ) {
    this.form = this._buildForm();
  }

  ngOnInit(): void {
    this.loadProjects();
  }

  touchedInputs(): void {
    this.form.markAllAsTouched();
    this.form.get('project').markAsDirty();
    this.form.get('description').markAsDirty();
  }

  private _buildForm(): FormGroup {
    const inputs: any = {
      project: [null, [Validators.required]],
      description: [null, [Validators.required, Validators.maxLength(250)]],
    };
    return this._fb.group(inputs);
  }

  loadProjects(): void {
    this._comboService.projects().subscribe(projects => this.projectList = projects);
  }

  submitForm(): void {

    this.touchedInputs();
    if (this.form.invalid) return;

    this.service = true;
    this._advanceService.insert(this.form.value).subscribe(res => {
      this.service = false;
      this._snackBarService.show({ message: res.res.msg });
      this.form.get('project').setValue(null);
      this.form.get('description').setValue(null);
    }, () => {
      this.service = false;
    });
  }

}
