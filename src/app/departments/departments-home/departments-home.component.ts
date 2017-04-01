import { Component, OnInit } from '@angular/core';

import { FirebaseListObservable } from 'angularfire2';
import { DatabaseService } from '../../common/services/database.service';
import { User, Shop } from '../../common/model/';

@Component({
  selector: 'app-departments-home',
  templateUrl: './departments-home.component.html',
  styleUrls: ['./departments-home.component.css']
})
export class DepartmentsHomeComponent implements OnInit {

  user: User = this.databaseService.user;
  shops: Shop[];
  shops$: FirebaseListObservable<any[]>;
  //departments: Department[];
  //departments$: FirebaseListObservable<Department[]>;

  constructor(private databaseService: DatabaseService) {
    console.log("constructor ");
  }

  ngOnInit() {
    console.log("ngOnInit load shop");
    this.shops$ = this.databaseService.shops$
    this.shops$.subscribe(temp => {
      temp.sort((temp1, temp2) => temp1.order - temp2.order);
      this.shops = temp
    })
  }
}


