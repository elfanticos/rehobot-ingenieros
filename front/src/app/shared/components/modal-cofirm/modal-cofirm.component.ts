import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-cofirm',
  templateUrl: './modal-cofirm.component.html',
  styleUrls: ['./modal-cofirm.component.scss']
})
export class ModalCofirmComponent implements OnInit {
  @Output() send: EventEmitter<any> = new EventEmitter();
  constructor(
    public dialogRef: MatDialogRef<ModalCofirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
  }

  onNoClick = (): void => { this.dialogRef.close(); }

  sendConfirm(): void {
    this.send.emit();
  }
}
