import { by } from 'protractor';
import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';

import { DatabaseService } from './../services/database.service';
import { Item } from '../model';

@Component({
  selector: 'edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {

  @Input() item: Item;
  private itemForm: FormGroup;

  constructor(private fb: FormBuilder, private databaseService: DatabaseService) { 
    //console.log("EditItemComponent constructor ");
  }

  ngOnInit() {
    console.log("EditItemComponent ngOnInit " + JSON.stringify(this.item));
    this.itemForm = this.fb.group({
      $key: this.item.$key,
      buy: this.item.buy,
      owner: this.item.owner,
      quantity: this.item.quantity,
      unit: this.item.unit,
      name: this.item.name,
      order: this.item.order
    });
  }

  onChange() {
    console.log("itemChanged " + JSON.stringify(this.itemForm.value));
    if (this.itemForm.value.$key === this.item.$key) {
      console.log("itemChanged-key " + JSON.stringify(this.itemForm.value.$key));
      this.databaseService.itemChanged(this.itemForm.value);
    }
  }
}
