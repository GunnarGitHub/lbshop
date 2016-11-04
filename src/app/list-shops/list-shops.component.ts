import { Component, OnInit, EventEmitter, Input, Output} from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Store } from "@ngrx/store";

import { Shop, AppState } from '../model/';
import { ShopsService } from '../services'

@Component({
  selector: 'list-shops',
  templateUrl: './list-shops.component.html',
  styleUrls: ['./list-shops.component.css']
})
export class ListShopsComponent implements OnInit {
  @Input()
  shops: Shop[] = [];
  
  @Output()
  shopChanged = new EventEmitter<Shop>();
  constructor(private shopsService : ShopsService, private store:Store<AppState> ) { 
  }

  ngOnInit() {
    // TODO load initialt state from service component
  }

  onChangeShop(owner: string) {
    console.log("onClickShop: " + owner);
    let shops: Shop[] = this.shops.filter((shop: Shop) => shop.key == owner )
    this.shopChanged.emit(shops[0]);
  }
}
