import { by } from 'protractor';
import { FirebaseListObservable } from 'angularfire2';
import { DatabaseService } from './services/database.service';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { Shop, User, Department } from './model/';
import { ListShopsComponent } from './list-shops';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'LB SHOP';
  //shop: Shop = {key: 'shop', owner:'owner', name:'name', order: 1.2};
  user: User = this.databaseService.user;
  shop: Shop;
  shops$: FirebaseListObservable<any[]>;
  departments: Department[];
  departments$: FirebaseListObservable<Department[]>;

  constructor(
    private databaseService: DatabaseService, ) {
    console.log("AppComponent constructor ");
  }

  ngOnInit() {
    console.log("AppComponent ngOnInit load shops and departments");
    this.shops$ = this.databaseService.shops$
  }

  onShopChanged(shop: Shop) {
    console.log("onShopChanged "); // + JSON.stringify(shop));
    this.shop = shop;
    this.databaseService.shopChanged(shop);
    this.departments$ = this.databaseService.db.list('/departments', {
      query: {
        orderByChild: 'owner',
        equalTo: this.shop.$key
      }
    });
    this.departments$.subscribe(deps => {
      deps.sort((dep1, dep2) => dep1.order - dep2.order);
      this.departments = deps
    })
  }
}

