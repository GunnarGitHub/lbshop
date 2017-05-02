import { ListShopsComponent } from './../../items/list-shops/list-shops.component';
import { FirebaseListObservable } from 'angularfire2';
import { DatabaseService } from '../../common/services/database.service';
import { Component, OnInit, Input } from '@angular/core';

import { Shop, Department } from './../../common/model';

@Component({
  selector: 'list-departments',
  templateUrl: './list-departments.component.html',
  styleUrls: ['./list-departments.component.css']
})
export class ListDepartmentsComponent implements OnInit {

  @Input() shop: Shop

  departments: Department[]
  departments$: FirebaseListObservable<Department[]>

  constructor(private databaseService: DatabaseService) {
    this.departments$ = this.departmentsByOwner$(this.shop)
    this.departments$.subscribe(temp => {
      temp.sort((temp1, temp2) => temp1.order - temp2.order);
      this.departments = temp
    })

  }


 public departmentsByOwner$(shop: Shop) : FirebaseListObservable<Shop[]> {
   console.log("departmentsByOwner$ " + JSON.stringify(ListShopsComponent));
   return this.databaseService.departmentsByOwner$(shop)
 }

  ngOnInit() {
  }

}
