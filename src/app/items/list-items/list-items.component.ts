import { Subject } from 'rxjs/Subject';
import { FirebaseListObservable } from 'angularfire2/database';
import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Observable } from 'rxjs/Rx';

import { Item, Department } from '../../common/model';
import { DatabaseService, SearchService } from './../../common/services';

@Component({
  selector: 'list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.css']
})

export class ListItemsComponent implements OnInit, OnDestroy {

  items: Item[]
  itemForm: FormGroup
  @Input() department: Department
  @Input() id: string
  @Output() firstItemEvent: EventEmitter<Item> = new EventEmitter();

  constructor(private fb: FormBuilder, private databaseService: DatabaseService, private searchService: SearchService) {
    console.log("constructor ") // + JSON.stringify(this.items));
  }

  items$: FirebaseListObservable<Item[]>
  //itemSubscription: any
  searchSubscription: Subject<string>
  searchResult$: Observable<[Item[], string]>
  searchResultSubscription: any

  ngOnInit() {
    console.log("ngOnInit")
    if (this.itemForm) {
      this.itemForm.reset()
    }
    this.items$ = this.databaseService.db.list('/items', {
      query: {
        orderByChild: 'owner',
        equalTo: this.department.$key
      }
    });

    this.itemForm = this.fb.group({
      items: this.fb.array([])
    });
    this.searchSubscription = this.searchService.getSearchSubject();

    this.searchResult$ = Observable.combineLatest(this.items$, this.searchSubscription);

    this.searchResultSubscription = this.searchResult$.subscribe(latestValues => {
      const [items, searchString] = latestValues;
      this.items = items.filter(item => item.name.toLowerCase().includes(searchString.toLowerCase()))
      this.items.sort((a, b) => a.order - b.order)
      this.itemForm = this.fb.group({
        items: this.fb.array([])
      });
      this.showItems()
      this.firstItemEvent.emit(this.items? this.items[0] : null)
    })
  }

  ngOnDestroy() {
    console.log("ngOnDestroy ")
    this.searchSubscription.unsubscribe
    this.searchResultSubscription.unsubscribe
  }

  showItems() {
    if (this.items) {
      // console.log('showItems ' + JSON.stringify(this.items));
      this.items.forEach(item => {
        const control = <FormArray>this.itemForm.controls['items'];
        control.push(this.showItem(item))
      });
    }
  }

  showItem(item: Item) {
    //console.log('showItem ' + JSON.stringify(item))
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
  /*GB
  getItems(): Item[] {
    return this.itemForm.controls['items']['controls'];
  }
  */
}
