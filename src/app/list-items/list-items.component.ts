import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { FirebaseListObservable } from 'angularfire2';
import 'rxjs/Rx';

import { Department, Item } from '../model/model';
import { DatabaseService } from './../services/database.service';

@Component({
  selector: 'list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.css']
})

export class ListItemsComponent implements OnInit, OnDestroy {

  items: Item[]
  itemsSubscription: any

  dep: Department;
  @Input('department')
  set department(department: Department) {
    console.log('ListItemsComponent set department ' + JSON.stringify(department))
    this.dep = department;
    this.databaseService.departmentChanged(this.dep);
  }

  private itemForm: FormGroup;

  constructor(private fb: FormBuilder, private databaseService: DatabaseService) {
    // console.log("ListItemsComponent constructor " + JSON.stringify(this.items));
  }

  ngOnInit() {
    console.log("ListItemsComponent ngOnInit " + JSON.stringify(this.dep));
    this.itemForm = this.fb.group({
      items: this.fb.array([])
    });
    this.itemsSubscription = this.databaseService.getItemsObservable()
    this.itemsSubscription.subscribe(res => {
      console.log('ListItemsComponent resule ' + JSON.stringify(res))
      this.items = res;
      this.showItems()
    });

  }

  showItems() {
    console.log('ListItemsComponent  showItems ' + JSON.stringify(this.items));
    if (this.items) {
      this.items.forEach(item => {
        const control = <FormArray>this.itemForm.controls['items'];
        control.push(this.showItem(item))
      });
    }
  }

  ngOnDestroy() {
    console.log("ListItemsComponent ngOnDestroy ")
    this.itemsSubscription.unsubscribe;
  }
  // addItem() {
  //       const control = <FormArray>this.itemForm.controls['items'];
  //       control.push(this.pushItem());
  //   }

  showItem(item: Item) {
    return this.fb.group({
      $key: item.$key,
      buy: item.buy,
      owner: item.owner,
      quantity: item.quantity,
      unit: item.unit,
      name: item.name,
      order: item.order
    });
  }


  // onBlur() {
  //   console.log("onBlur "); // + JSON.stringify(this.itemForm.value));
  //   this.itemsService.changeItem(this.itemForm.value);
  // }
}
