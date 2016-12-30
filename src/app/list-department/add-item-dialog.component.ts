import { MdDialogRef } from '@angular/material';
import { Item } from './../model/model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'add-item-dialog',
  template: `
    <div>
     <form #f="ngForm">
       <md-input-container class="md-block"> 
         <input type="hidden" name="owner" [(ngModel)]="item.owner">
         <input type="checkbox" name="buy" [(ngModel)]="item.buy">
         <input name="quantity" [(ngModel)]="item.quantity" [style.width.em]="3" >
         <input name="unit" [(ngModel)]="item.unit" [style.width.em]="6">
         <input placeholder="insert item name" name="name" autofocus [(ngModel)]="item.name" [style.width.em]="25">
         <input name="order" [(ngModel)]="item.order" [style.width.em]="4">
       </md-input-container>
       <md-dialog-actions>
        <button (click)="dialogRef.close(item)">Add Item</button>
        <button md-dialog-close>Cancel</button>
      </md-dialog-actions>
     </form>
    </div>
  `,
  styles: []
})

export class AddItemDialogComponent implements OnInit {
  item: Item = { buy: true, owner: 'own', quantity: 1, unit: "st", name: null, order: 11 }

  constructor(public dialogRef: MdDialogRef<any>) { }

  ngOnInit() {
  }

  onSubmitTemplateBased() {
    console.log('onSubmitTemplateBased ' + JSON.stringify(this.item));
  }
}
