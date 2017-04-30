import { Component, OnInit, OnChanges, AfterViewInit, Input } from '@angular/core';

import { FirebaseListObservable } from 'angularfire2';
import { DatabaseService } from '../../common/services/database.service';
import { User, Shop, Department } from '../../common/model/';

@Component({
  selector: 'departments-home',
  templateUrl: './departments-home.component.html',
  styleUrls: ['./departments-home.component.css']
})
export class DepartmentsHomeComponent implements OnInit {

  @Input() shop : Shop

  user: User
  //GB shops: Shop[]
  shops$: FirebaseListObservable<Shop[]>
  //departments: Department[];
  constructor(private databaseService: DatabaseService) {
    console.log("constructor ");
  }

  ngOnInit() {
    console.log("ngOnInit");
     this.user = this.databaseService.loggedIn();
    //GB this.shops$ = this.databaseService.shops$
    this.shops$ = this.databaseService.shopsByUser$(this.user)
    /* GB
    this.shops$.subscribe(temp => {
      temp.sort((temp1, temp2) => temp1.order - temp2.order);
      this.shops = temp
    })
    */
  }

 public shopsByOwner$(user: User) : FirebaseListObservable<Shop[]> {
   console.log("shopsByOwner");
   return this.databaseService.shopsByUser$(this.user)
 }

  public loggedIn() {
    return this.databaseService.loggedIn()
  }
}


