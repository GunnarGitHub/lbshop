import { AddItemDialogComponent } from './add-item-dialog.component';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject'
import { Component, OnInit, Input } from '@angular/core'
import { FormGroup, FormBuilder } from '@angular/forms'

import { SearchService } from './../services'
import { DatabaseService } from './../services'
import { Department, Item } from './../model'

@Component({
  selector: 'list-department',
  templateUrl: './list-department.component.html',
  styleUrls: ['./list-department.component.css']
})
export class ListDepartmentComponent implements OnInit {

  @Input() department: Department
  private departmentForm: FormGroup
  private hidden: boolean
  private searchSubscription: Subject<string>
  private dialogRef: MdDialogRef<AddItemDialogComponent>
  private itemToAdd: Item

  constructor(private fb: FormBuilder,
    private databaseService: DatabaseService,
    private searchService: SearchService,
    private dialog: MdDialog) {
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
    this.searchSubscription.subscribe(search => {
      console.log('search ' + search + ' ' + this.department.name)
      if (search.length > 0) {
        this.hidden = !this.department.name.toLowerCase().includes(search.toLowerCase())
      } else {
        this.hidden = false
      }
      console.log('ngOnInit hidden? ' + this.hidden)
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

  openAddItemDialog() {
    console.log('openAddItemDialog')
    this.dialogRef = this.dialog.open(AddItemDialogComponent)
    let owner = this.departmentForm.value.$key
    console.log('owner ' + owner)
    let items: Item[] = []
    this.databaseService.db.list('/items', {
      query: {
        orderByChild: 'owner',
        equalTo: owner
      }
    }).subscribe(res => {
      items = res
      items.sort((a, b) => (a.order - b.order))
      console.log((items[0] ? JSON.stringify(items[0]) : 'no items'))
      this.setUpdialog((items[0] ? items[0] : null))
    });
  }

  setUpdialog(item: Item) {
    this.dialogRef.componentInstance.item.order = (item ? item.order - 100 : 10000)
    this.dialogRef.componentInstance.item.owner = this.department.$key
    this.dialogRef.afterClosed().subscribe(res => {
      this.itemToAdd = res
      console.log('openAddItemDialog res ' + (res ? JSON.stringify(this.itemToAdd) : 'null'))
      // TODO add item to database
      this.dialogRef = null
    })
  }

}
