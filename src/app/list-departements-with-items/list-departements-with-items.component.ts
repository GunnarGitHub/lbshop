import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs'
import { Store } from "@ngrx/store";

import { AppState, Department, Item } from '../model';

@Component({
  selector: 'list-departements-with-items',
  templateUrl: './list-departements-with-items.component.html',
  styleUrls: ['./list-departements-with-items.component.css']
})
export class ListDepartementsWithItemsComponent implements OnInit {

@Input() departments: Department[] = [];

items$: Observable<Item[]>;

  constructor( private store: Store<AppState>) {
    console.log("ListDepartementsWithItemsComponent constructor");
    this.items$ = store.select(s => s.items)
   }
  
  ngOnInit() {
  }

}
