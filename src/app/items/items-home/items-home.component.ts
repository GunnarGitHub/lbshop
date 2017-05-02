import { by } from 'protractor';
import { FirebaseListObservable } from 'angularfire2';
import { DatabaseService } from '../../common/services/database.service';
import { Component, OnInit, Input } from '@angular/core';
import { User, Shop, Department } from '../../common/model/';
import { ListShopsComponent } from '../list-shops';
@Component({
  selector: 'items-home',
  templateUrl: './items-home.component.html',
  styleUrls: ['./items-home.component.css']
})
export class ItemsHomeComponent implements OnInit {

  user: User;
  shops$: FirebaseListObservable<any[]>;
  departments: Department[];
  departments$: FirebaseListObservable<Shop[]>;

  constructor(
    private databaseService: DatabaseService, ) {
    console.log("constructor ");
  }

  ngOnInit() {
    console.log("ngOnInit");
    this.user = this.databaseService.loggedIn();
    this.shops$ = this.databaseService.shopsByOwner$(this.user)
  }

  onShopChanged(shop: Shop) {
    console.log("onShopChanged "); // + JSON.stringify(shop));
    this.departments$ = this.databaseService.db.list('/departments', {
      query: {
        orderByChild: 'owner',
        equalTo: shop.$key
      }
    });
    this.departments$.subscribe(deps => {
      deps.sort((dep1, dep2) => dep1.order - dep2.order);
      this.departments = deps
    })
  }
}
