import { MdDialogRef } from '@angular/material';
import { Item } from './../model/model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'add-item-dialog',
  templateUrl: './add-item-dialog.component.html',
  styles: []
})

export class AddItemDialogComponent implements OnInit {
  item: Item = { buy: true, owner: 'own', quantity: 1, unit: "st", name: null, order: 11 }

  constructor(public dialogRef: MdDialogRef<any>) { }

  ngOnInit() {
  }
}
