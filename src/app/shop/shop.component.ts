import { Component, OnInit } from '@angular/core';

import { Shop } from '../common/model'

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  shop: Shop;

  constructor() {
    console.log("Shop constructor");
  }

  ngOnInit() {
  }

}
