import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import {map, startWith} from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';

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
  proyectCtrl = new FormControl();
  filteredProyects: Observable<string[]>;
  proyects: string[] = ['Proyect X'];
  allProyects: string[] = ['Armagedon', 'Space X', 'Tesla', 'Softhy', 'Italia', 'Proyect X'];
  @ViewChild('proyectInput') proyectInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  constructor() {
    this.filteredProyects = this.proyectCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.allProyects.slice()));
  }

  ngOnInit() {
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.proyects.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.proyectCtrl.setValue(null);
  }

  remove(proyect: string): void {
    const index = this.proyects.indexOf(proyect);

    if (index >= 0) {
      this.proyects.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.proyects.push(event.option.viewValue);
    this.proyectInput.nativeElement.value = '';
    this.proyectCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allProyects.filter(proyect => proyect.toLowerCase().indexOf(filterValue) === 0);
  }

}
