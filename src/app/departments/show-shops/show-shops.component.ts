import { Component, OnInit, Input } from '@angular/core';

import { Shop } from './../../common/model';

@Component({
  selector: 'show-shops',
  templateUrl: './show-shops.component.html',
  styleUrls: ['./show-shops.component.css']
})
export class ShowShopsComponent implements OnInit {

  @Input() shops: Shop
  
  constructor() { }

  ngOnInit() {
  }

}
