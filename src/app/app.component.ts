import { Component, OnInit, Input } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Store } from "@ngrx/store";

import { AppState, Shop, User, Department, Item } from './model/';
import { ListShopsComponent } from './list-shops';
import { ShopsService, DepartmentsService, ItemsService } from './services'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'LB SHOP';
  shop: Shop = {key: 'shop', owner:'owner', name:'name', order: 1.2};
  user: User = { key: "gunnar", name: "Gunnar" }; //TODO take from appstore
  shop$: Observable<Shop>;
  shops$:  Observable<Shop[]>;
  departments$: Observable<Department[]>;
  items$: Observable<Item[]>;

  constructor(private itemsService: ItemsService, private departmentsService: DepartmentsService, private shopsService: ShopsService, private store: Store<AppState>) {
    console.log("AppComponent constructor ");
    this.items$ = this.store.select(s => s.items);
  }

  ngOnInit() {
    console.log("AppComponent ngOnInit load shops, departments and items");
    this.shop$ = this.store.select(s => s.shop);
    this.shops$ = this.shopsService.shops$;
    this.departments$ = this.store.select(s => s.departments);
    this.shopsService.loadShops(this.user.key);
  };

  shopIsChanged(shop: Shop) {
    console.log("onShopChanged "); // + JSON.stringify(shop));
    this.store.dispatch({type: 'CHANGE_SHOP', payload: shop})
    this.shop = shop;
    this.departmentsService.loadDepartments();
    this.itemsService.loadItems();
  }
}
