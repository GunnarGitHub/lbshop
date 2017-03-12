import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject'
import { Component, OnInit, Input } from '@angular/core'
import { FormGroup, FormBuilder } from '@angular/forms'

import { SearchService, DatabaseService } from './../../common/services'
import { Department, Item } from './../../common/model'

@Component({
  selector: 'list-department',
  templateUrl: './list-department.component.html',
  styleUrls: ['./list-department.component.css']
})
export class ListDepartmentComponent implements OnInit {

  @Input() department: Department
  @Input() id: string
  private departmentForm: FormGroup
  private hidden: boolean
  private searchSubscription: Subject<string>
  firstItem: Item

  constructor(private fb: FormBuilder,
    private databaseService: DatabaseService,
    private searchService: SearchService) {
    console.log('constructor');
  }

  addFirstItem(item: Item) {
    this.firstItem = item
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
    this.searchSubscription.subscribe(search => {
      //console.log('search ' + search + ' ' + this.department.name)
      if (search.length > 0) {
        this.hidden = !this.department.name.toLowerCase().includes(search.toLowerCase())
      } else {
        this.hidden = false
      }
      //console.log('ngOnInit hidden? ' + this.hidden)
    })
  }

  ngOnDestroy() {
    console.log("ngOnDestroy ")
    this.searchSubscription.unsubscribe
  }

  onChange() {
    //console.log("onChange " + JSON.stringify(this.departmentForm.value));
    this.databaseService.updateDepartment(this.departmentForm.value);
  }

  addNewItem() {
    console.log('addNewItem')
    let owner = this.departmentForm.value.$key
    let item: Item = {
      owner: owner, buy: true, quantity: 1, unit: 'st', name: '',
      order: this.firstItem ? (this.firstItem.order - 100) : 10000
    }
    this.databaseService.addItem(item)
  }
}
