import { Component, OnInit, Input } from '@angular/core';
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/from';

import { DepartmentsService } from '../services'
import { Department, AppState } from '../model'

@Component({
  selector: 'list-department',
  templateUrl: './list-departments.component.html',
  styleUrls: ['./list-departments.component.css']
})
export class ListDepartmentsComponent implements OnInit {

  @Input() departments: Department[];

  constructor(private departmentService: DepartmentsService, private store: Store<AppState>) {
    console.log("constructor ListDepartmentsComponent");
  }

  ngOnInit() {
  }

}
