import { Injectable } from '@angular/core';

import { Item } from '../model';

@Injectable()
export class ItemsService {

  itemsLoaded: boolean;

  constructor() {
    console.log("ItemsService constructor");
  }

  changeItem(item: Item) {
    console.log("TODO ItemsService dispatch CHANGE_ITEM");
    //TODO to edit items? this.store.dispatch({ type: 'CHANGE_ITEM', payload: item });
  }

}
