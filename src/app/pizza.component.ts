import {Component} from '@angular/core';
import { MdDialogRef, MdDialog} from '@angular/material'
@Component({
  selector: 'pizza-component',
  template: `
  <button type="button" (click)="openDialog()">Open dialog</button>
  `
})
export class PizzaComponent {

  dialogRef: MdDialogRef<PizzaDialog>;

  constructor(public dialog: MdDialog) { }

  openDialog() {
    this.dialogRef = this.dialog.open(PizzaDialog, {
      disableClose: false
    });

    this.dialogRef.afterClosed().subscribe(result => {
      console.log('result: ' + result);
      this.dialogRef = null;
    });
  }
}

@Component({
  selector: 'pizza-dialog',
  template: `
  <h1 md-dialog-title>Would you like to order pizza?</h1>

  <md-dialog-actions>
    <button (click)="dialogRef.close('yes')">Yes</button>
    <button md-dialog-close>No</button>
  </md-dialog-actions>
  `
})
export class PizzaDialog {
  constructor(public dialogRef: MdDialogRef<PizzaDialog>) { }
}