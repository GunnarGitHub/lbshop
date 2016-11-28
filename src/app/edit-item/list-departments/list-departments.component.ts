import { Component, OnInit, Input } from '@angular/core';

import { DepartmentsService } from '../services'
import { Department } from '../model'

@Component({
  selector: 'list-department',
  templateUrl: './list-departments.component.html',
  styleUrls: ['./list-departments.component.css']
})
export class ListDepartmentsComponent implements OnInit {

  @Input() departments: Department[];

  constructor(private departmentService: DepartmentsService) {
    console.log("constructor ListDepartmentsComponent");
  }

  ngOnInit() {
  }

}
