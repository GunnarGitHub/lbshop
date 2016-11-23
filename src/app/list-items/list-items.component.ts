import { DepartmentsService } from './../services/departments.service';
import { DatabaseService } from './../services/database.service';
import { Component, OnInit, Input } from '@angular/core';
import 'rxjs/Rx';

import { Department } from './../model/model';

import { Item } from '../model';

@Component({
  selector: 'list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.css']
})

export class ListItemsComponent implements OnInit {

  @Input() items: Item[] = [];

  dep: Department;
  @Input('department')
  set department(department: Department) {
    this.dep = department;
    this.databaseService.departmentChanged(department);
  }

  constructor(private databaseService: DatabaseService) {
    console.log("ListItemsComponent constructor ");// + JSON.stringify(this.items));
  }

  ngOnInit() {
    console.log("ListItemsComponent ngOnInit ");// + JSON.stringify(this.items));
  }

  // onBlur() {
  //   console.log("onBlur "); // + JSON.stringify(this.itemForm.value));
  //   this.itemsService.changeItem(this.itemForm.value);
  // }
}
