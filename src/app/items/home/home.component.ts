import { by } from 'protractor';
import { FirebaseListObservable } from 'angularfire2';
import { DatabaseService } from '../../common/services/database.service';
import { Component, OnInit, Input } from '@angular/core';
import { User, Shop, Department } from '../../common/model/';
import { ListShopsComponent } from '../list-shops';
@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: User = this.databaseService.user;
  shop: Shop;
  shops$: FirebaseListObservable<any[]>;
  departments: Department[];
  departments$: FirebaseListObservable<Shop[]>;

  constructor(
    private databaseService: DatabaseService, ) {
    console.log("constructor ");
  }

  ngOnInit() {
    console.log("ngOnInit load shop");
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
