import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Store, Action } from "@ngrx/store";

import { Item, AppState } from '../model';

@Injectable()
export class ItemsService {

  items$: Observable<Item[]>;
  itemsLoaded: boolean;

  constructor(private store: Store<AppState>) {
    console.log("ItemsService constructor");
    this.items$ = this.store.select(s => s.items);
    this.itemsLoaded = false;
  }

  loadItems(): void {
    console.log("ItemsService loadItems");

    let initialState = [
      { key: "äpplen", owner: "frukt", buy: true, quantity: 1, unit: "st", name: "Äpplen", order: 1.0 },
      { key: "päron", owner: "frukt", buy: false, quantity: 1, unit: "st", name: "Päron", order: 2.0 },
      { key: "grädde", owner: "mejeri", buy: false, quantity: 8, unit: "st", name: "Grädde", order: 4.0 },
      { key: "mjölk", owner: "mejeri", buy: false, quantity: 7, unit: "st", name: "Mjölk", order: 3.0 },
      { key: "batterier", owner: "diverse", buy: false, quantity: 9, unit: "st", name: "AA Batterier", order: 5.0 },
      { key: "lampa60", owner: "diverse", buy: false, quantity: 9, unit: "st", name: "60 W Lampa", order: 8.0 },
      { key: "lampa40", owner: "diverse", buy: false, quantity: 9, unit: "st", name: "40 W Lampa", order: 4.0 },
      { key: "blommor", owner: "ovrigt", buy: false, quantity: 3, unit: "st", name: "Blommor", order: 6.0 }
    ];
    if (!this.itemsLoaded) {
      console.log("ItemsService dispatch LOAD_ITEMS");
      this.store.dispatch({ type: 'LOAD_ITEMS', payload: initialState });
      this.itemsLoaded = true;
    }
  }

  changeItem(item: Item) {
    console.log("ItemsService dispatch CHANGE_ITEM");
    this.store.dispatch({ type: 'CHANGE_ITEM', payload: item });
  }

}