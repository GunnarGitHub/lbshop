import { Component, OnInit, Input } from '@angular/core';

import { Shop,Department } from './../../common/model';

@Component({
  selector: 'show-shops',
  templateUrl: './show-shops.component.html',
  styleUrls: ['./show-shops.component.css']
})
export class ShowShopsComponent implements OnInit {

  @Input() shops: Shop
  @Input() departments: Department[]
  
  constructor() { }

  ngOnInit() {
  }

}
