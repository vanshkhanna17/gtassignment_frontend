import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FundDetails } from '../fund-details.model';

export interface DialogData{
  fundDetails: FundDetails;
  units: number;
}

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})

export class DialogBoxComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,) { }

  ngOnInit() {
  }

  close(){
    this.dialogRef.close();
  }

}
