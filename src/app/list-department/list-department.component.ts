import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject'
import { Component, OnInit, Input } from '@angular/core'
import { FormGroup, FormBuilder } from '@angular/forms'

import { SearchService } from './../services'
import { DatabaseService } from './../services'
import { Department } from './../model'

@Component({
  selector: 'list-department',
  templateUrl: './list-department.component.html',
  styleUrls: ['./list-department.component.css']
})
export class ListDepartmentComponent implements OnInit {


  @Input() department: Department
  private departmentForm: FormGroup
  private hidden = false
  private searchSubscription: Subject<string>

  constructor(private fb: FormBuilder, private databaseService: DatabaseService, private searchService: SearchService) {
    console.log('constructor');
  }

  ngOnInit() {
    console.log('ngOnInit ');
    this.departmentForm = this.fb.group({
      $key: this.department.$key,
      name: this.department.name,
      owner: this.department.owner,
      order: this.department.order
    })
    this.searchSubscription = this.searchService.getSearchSubject()
    let searchString = ''
    this.searchSubscription.subscribe(search => searchString = search)
    console.log('ngOnInit' + searchString + ' ' + this.department.name)
    if (searchString.length > 0) {
      this.hidden = this.department.name.toLowerCase().includes(searchString.toLowerCase())
    } else {
      this.hidden = false
    }
    console.log('ngOnInit hidden? ' + this.hidden)
  }

  ngOnDestroy() {
    console.log("ngOnDestroy ")
    this.searchSubscription.unsubscribe
  }

  onChange() {
    //console.log("onChange " + JSON.stringify(this.departmentForm.value));
    this.databaseService.updateDepartment(this.departmentForm.value);
  }
}
