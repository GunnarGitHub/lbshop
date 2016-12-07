import { FirebaseListObservable } from 'angularfire2';
import { ItemsPipe } from './../pipes/items.pipe';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import 'rxjs/Rx';

import { Item, Department } from '../model';
import { DatabaseService } from './../services';

@Component({
  selector: 'list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.css']
})

export class ListItemsComponent implements OnInit, OnDestroy {

  private items: Item[]
  private itemForm: FormGroup
  @Input() department: Department

  constructor(private fb: FormBuilder, private databaseService: DatabaseService) {
    console.log("constructor ") // + JSON.stringify(this.items));
  }

  items$: FirebaseListObservable<Item[]>
  subscription: any

  ngOnInit() {
    console.log("ngOnInit")
    if (this.itemForm) {
      this.itemForm.reset()
      console.log('reset form')
    } else {
      console.log('NOT reset form')
    }
    //let obs = this.databaseService.getItemsObservable();
    this.items$ = this.databaseService.db.list('/items', {
      query: {
        orderByChild: 'owner',
        equalTo: this.department.$key
      }
    });

    this.itemForm = this.fb.group({
      items: this.fb.array([])
    });

    this.subscription = this.items$.subscribe(items => {
      this.items = items
      this.items.sort((a,b) => a.order - b.order)
      console.log('subscribe items ' + JSON.stringify(this.items))
      this.itemForm = this.fb.group({
        items: this.fb.array([])
      });
      this.showItems()
    });
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
    this.subscription.unsubscribe
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
