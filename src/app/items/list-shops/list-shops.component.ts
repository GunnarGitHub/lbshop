import { Component, OnInit, EventEmitter, Input, Output} from '@angular/core';

import { Shop } from '../../common/model/';

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
  constructor() { 
  }

  ngOnInit() {
  }

  onChangeShop(owner: string) {
    //console.log("onClickShop: " + owner);
    let shops: Shop[] = this.shops.filter((shop: Shop) => shop.$key == owner )
    this.shopChanged.emit(shops[0]);
  }
}
