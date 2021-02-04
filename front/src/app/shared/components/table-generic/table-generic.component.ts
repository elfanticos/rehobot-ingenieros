import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table-generic',
  styleUrls: ['table-generic.component.scss'],
  templateUrl: 'table-generic.component.html',
})
export class TableGenericComponent implements AfterViewInit {
  dataSource: MatTableDataSource<Object> = new MatTableDataSource<Object>([]);
  @Input()
  set data(value: any) {
    this.dataSource = new MatTableDataSource<Object>(value);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  @Input() displayedColumns: string[] = [];
  @Input() titlesColumns: Object = {};
  @Input() loading: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Output() edit: EventEmitter<any> = new EventEmitter();
  @Output() remove: EventEmitter<any> = new EventEmitter();
  constructor() {
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editRow(row: any): void {
    this.edit.emit(row);
  }

  removeRow(row: any): void {
    this.remove.emit(row);
  }
}