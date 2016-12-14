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
  departments$: FirebaseListObservable<Department[]>;

  constructor(
    private databaseService: DatabaseService, ) {
    console.log("AppComponent constructor ");
  }

  ngOnInit() {
    console.log("AppComponent ngOnInit load shops, departments and items");
    this.shops$ = this.databaseService.shops$
    this.departments$ = this.databaseService.getDepartmentsObservable();
    //this.shopsService.loadShops(this.user.key);
  };

  getDepartments() {

  }
  shopIsChanged(shop: Shop) {
    console.log("onShopChanged "); // + JSON.stringify(shop));
    this.shop = shop;
    this.databaseService.shopChanged(shop);
  }
}
