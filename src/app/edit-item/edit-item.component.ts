import { by } from 'protractor';
import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';


import { DatabaseService } from './../services';
import { Item } from '../model';

@Component({
  selector: 'edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {

  @Input('group')
  private itemForm: FormGroup;

  constructor(private fb: FormBuilder, private databaseService: DatabaseService) {
    console.log("constructor ");
  }

  ngOnInit() {
    console.log("ngOnInit ")// + this.itemForm.controls.['items'].controls.length);
  }


  onChange() {
    //console.log("itemChanged " + JSON.stringify(this.itemForm.value));
    this.databaseService.updateItem(this.itemForm.value);
  }
}
