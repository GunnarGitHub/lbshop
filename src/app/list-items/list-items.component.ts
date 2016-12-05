import { ItemsPipe } from './../pipes/items.pipe';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import 'rxjs/Rx';

import { Item } from '../model/model';
import { DatabaseService } from './../services';

@Component({
  selector: 'list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.css']
})

export class ListItemsComponent implements OnInit, OnDestroy {

  private items: Item[]

  private itemForm: FormGroup;

  constructor(private fb: FormBuilder, private databaseService: DatabaseService) {
    console.log("constructor ") // + JSON.stringify(this.items));
  }

  ngOnInit() {
    console.log("ngOnInit")
        
       //let obs = this.databaseService.getItemsObservable();
       let obs = this.databaseService.db.list('/items', {
         query: {
           orderByChild: 'owner',
           equalTo: this.databaseService.department.$key
         }
       });
       
       obs.subscribe(items => {
         console.log('ngOnInit items' + JSON.stringify(items))
         this.items = items
       });

    this.itemForm = this.fb.group({
      items: this.fb.array([])
    });
    this.showItems()
  }

  showItems() {
    if (this.items) {
      console.log('showItems ' + JSON.stringify(this.items));
      this.items.forEach(item => {
        const control = <FormArray>this.itemForm.controls['items'];
        control.push(this.showItem(item))
      });
    }
  }

  ngOnDestroy() {
    console.log("ngOnDestroy ")
  }

  showItem(item: Item) {
    console.log('showItem ' + JSON.stringify(item))
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
