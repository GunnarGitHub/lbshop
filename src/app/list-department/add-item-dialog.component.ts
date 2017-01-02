import { MdDialogRef } from '@angular/material';
import { Item } from './../model/model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'add-item-dialog',
  template: `
    <div>
     <form #f="ngForm">
       <!--md-input-container class="md-block"--> 
         <input type="hidden" name="owner" [(ngModel)]="item.owner">
         <input type="checkbox" name="buy" [(ngModel)]="item.buy">
         <input id="quantity" name="quantity" [(ngModel)]="item.quantity" [style.width.em]="3" >
         <input id="unit" name="unit" [(ngModel)]="item.unit" [style.width.em]="6">
         <input id="name" placeholder="insert item name" name="name" autofocus [(ngModel)]="item.name" [style.width.em]="25">
         <input id="order" name="order" [(ngModel)]="item.order" [style.width.em]="5">
       <!--/md-input-container-->
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
