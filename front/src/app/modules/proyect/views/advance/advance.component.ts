import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  constructor(
    private _fb: FormBuilder,
    private _comboService: ComboService,
    private _advanceService: AdvanceFacadeService
  ) {
    this.form = this._buildForm();
  }

  ngOnInit(): void {
    this.loadProjects();
  }

  private _buildForm(): FormGroup {
    const inputs: any = {
      project: [null, [Validators.required]],
      description: [null, [Validators.required]],
    };
    return this._fb.group(inputs);
  }

  loadProjects(): void {
    this._comboService.projects().subscribe(projects => this.projectList = projects);
  }

  submitForm(): void {
    console.log(this.form.value)
    this._advanceService.insert(this.form.value).subscribe(res => {
      console.log(res);
    });
  }

}
