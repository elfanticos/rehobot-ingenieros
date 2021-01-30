import { Component, ElementRef, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { map, startWith } from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-client-register',
  templateUrl: './modal-client-register.component.html',
  styleUrls: ['./modal-client-register.component.scss']
})
export class ModalClientRegisterComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  projectCtrl = new FormControl();
  filteredProjects: Observable<string[]>;
  projectsSelected: string[] = [];
  allProjects: string[] = [];
  @ViewChild('projectInput') projectInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  form: FormGroup;
  @Output() send: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    public dialogRef: MatDialogRef<ModalClientRegisterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb: FormBuilder
  ) {
    this.form = this._buildForm();
    this.initFilter();
  }

  ngOnInit(): void {
  }

  get name() { return this.form.controls['name']; }
  get ruc() { return this.form.controls['ruc']; }
  get address() { return this.form.controls['address']; }
  get projects() { return this.form.controls['projects']; }

  onNoClick = (): void => { this.dialogRef.close(); }

  private _buildForm(): FormGroup {
    const inputs = {
      name: [null, [Validators.required]],
      ruc: [null, [Validators.required]],
      address: [null, [Validators.required]],
      projects: [null]
    };

    return this._fb.group(inputs);
  }

  initFilter(): void {
    this.filteredProjects = this.projectCtrl.valueChanges.pipe(
      startWith(null),
      map((project: string | null) => project ? this._filter(project) : this.unSelectedProjects()));
  }

  submitForm(): void {
    this.send.emit(this.form.value);
  }

  unSelectedProjects(): string[] {
    const filterProjects = [];
    (this.allProjects.slice()).map(row => {
      if (!this.projectsSelected.includes(row)) {
        filterProjects.push(row);
      }
    });

    return filterProjects;
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.projectsSelected.push(value.trim());
      this.projects.setValue(this.projectsSelected);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.projectCtrl.setValue(null);
  }

  remove(proyect: string): void {
    const index = this.projectsSelected.indexOf(proyect);

    if (index >= 0) {
      this.projectsSelected.splice(index, 1);
      this.projects.setValue(this.projectsSelected);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.projectsSelected.push(event.option.viewValue);
    this.projects.setValue(this.projectsSelected);
    this.projectInput.nativeElement.value = '';
    this.projectCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allProjects.filter(project => project.toLowerCase().indexOf(filterValue) === 0);
  }

}
