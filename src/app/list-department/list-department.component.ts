import { Component, OnInit, Input } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';

import { DatabaseService } from './../services';
import { Department, Item } from './../model';

@Component({
  selector: 'list-department',
  templateUrl: './list-department.component.html',
  styleUrls: ['./list-department.component.css']
})
export class ListDepartmentComponent implements OnInit {


  @Input() department: Department
  
  items$: FirebaseListObservable<Item[]>

  constructor(private databaseService: DatabaseService) {
    console.log('ListDepartmentComponent constructor');
    this.items$ = this.databaseService.getItemsObservable();
  }

  ngOnInit() {
    console.log('ListDepartmentComponent ngOnInit ' + this.department.name);
    this.databaseService.departmentChanged(this.department)

  }

}
