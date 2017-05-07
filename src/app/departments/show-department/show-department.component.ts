import { Component, OnInit, Input } from '@angular/core';

import { Department } from './../../common/model';

@Component({ 
  selector: 'show-department',
  templateUrl: './show-department.component.html',
  styleUrls: ['./show-department.component.css']
})
export class ShowDepartmentComponent implements OnInit {

  @Input() department: Department
  constructor() { }

  ngOnInit() {
  }

}
