import { Component, OnInit, Input } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';
import { FormGroup, FormBuilder } from '@angular/forms';

import { DatabaseService } from './../services';
import { Department, Item } from './../model';

@Component({
  selector: 'list-department',
  templateUrl: './list-department.component.html',
  styleUrls: ['./list-department.component.css']
})
export class ListDepartmentComponent implements OnInit {


  @Input() department: Department
  private departmentForm: FormGroup;
  //public items$: FirebaseListObservable<Item[]>

  constructor(private fb: FormBuilder, private databaseService: DatabaseService) {
    console.log('constructor');
    //this.departmentForm = new FormGroup(departmentForm)
    //this.items$ = this.databaseService.getItemsObservable();
    // this.items$ = this.databaseService.items$;
  }

  ngOnInit() {
    console.log('ngOnInit ');
    this.departmentForm = this.fb.group({
      $key: this.department.$key,
      name: this.department.name,
      owner: this.department.owner,
      order: this.department.order
    })
  }

  onChange() {
    //console.log("onChange " + JSON.stringify(this.departmentForm.value));
    this.databaseService.updateDepartment(this.departmentForm.value);
  }
}
