import { Component, OnInit, EventEmitter, Input, Output} from '@angular/core';

import { Shop } from '../model/';
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
  constructor(private shopsService : ShopsService ) { 
  }

  ngOnInit() {
  }

  onChangeShop(owner: string) {
    console.log("onClickShop: " + owner);
    let shops: Shop[] = this.shops.filter((shop: Shop) => shop.$key == owner )
    this.shopChanged.emit(shops[0]);
  }
}
