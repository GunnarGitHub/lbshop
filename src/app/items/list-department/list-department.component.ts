import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject'
import { Component, OnInit, Input, AfterViewInit } from '@angular/core'
import { FormGroup, FormBuilder } from '@angular/forms'

import { SearchService, DatabaseService } from './../../common/services'
import { Shop, Department, Item } from './../../common/model'

@Component({
  selector: 'list-department',
  templateUrl: './list-department.component.html',
  styleUrls: ['./list-department.component.css']
})
export class ListDepartmentComponent implements OnInit, AfterViewInit {

  @Input() department: Department
  @Input() id: string
  departmentForm: FormGroup
  hidden: boolean
  searchSubscription: Subject<string>
  firstItem: Item
  dndItemKey = 'string:text/itemkey'

  constructor(private fb: FormBuilder,
    private databaseService: DatabaseService,
    private searchService: SearchService) {
    console.log('constructor');
  }

  addFirstItem(item: Item) {
    console.log('addFirstItem ' + JSON.stringify(item));
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

  ngAfterViewInit() {
    let el = document.getElementById(this.id)
    // handle droptarget
    el.addEventListener('dragenter', (event) => {
      console.log('dragenter id ' + this.id);
      //let itemKey: string = event.dataTransfer.getData(this.dndItemKey)
      event.preventDefault()
      el.className = "dzenter"
      /*
      if (this.dragStartKey) {
        targetElement.className = "dzleave"
        console.log('dragenter set class to dzleave')
      } else {
        el.className = "dzenter"
        console.log('dragenter set class to dzenter')
      }
      */
    })
    el.addEventListener('dragleave', (event) => {
      event.preventDefault()
      el.className = "dzleave"
    })
    el.addEventListener('drop', (event: DragEvent) => {
      console.log('drop')
      /*
      if(this.dragStartKey) {
        console.log('drop cannot drop on self')
        return
      }
      */
      let dragItemKey: string = event.dataTransfer.getData(this.dndItemKey);
      console.log('drop key ' + dragItemKey)
      let newOwner:string = this.departmentForm.value.$key
      console.log('drop owner ' + newOwner)
      let firstItemOrder: number = +this.firstItemOrder(this.id)
      console.log('dropHandler nextElement order ' + (firstItemOrder ? firstItemOrder : "null"))
      let newOrder: number =
        (firstItemOrder ? (firstItemOrder -100) : 10000)
      console.log('dropHandler neworder ' + newOrder)
      //TODO guard for no nextElemet, calculate owner and order for the moved item and update database

      this.databaseService.moveItem(dragItemKey, newOwner, newOrder)
      el.className = "dzleave"
    })
    el.addEventListener('dragover', (event) => {
      //console.log('dragover ' + this.key)
      event.preventDefault()
    })
  }

  firstItemOrder(id: string): number {
    let form: Element = document.getElementById(id + "i0")
    if (!form) return null
    return +form[6].value
  }

  ngOnDestroy() {
    console.log("ngOnDestroy ")
    this.searchSubscription.unsubscribe
  }

  onChange() {
    //console.log("onChange " + JSON.stringify(this.departmentForm.value));
    this.databaseService.updateDepartment(this.departmentForm.value);
  }

   newItem() {
    console.log('newItem')
    let form = document.getElementById(this.id+'i0')
    //GBconsole.log('form 4 ' + (<HTMLInputElement>form.children[4]).value)
    let order = form ? ((+(<HTMLInputElement>form.children[6]).value) - 100) : 1000
    //GB let owner = this.shopForm.value.$key
    let owner = this.department.$key
    let item: Item = {
      owner: owner, buy: true, quantity: 1, unit: 'st', name: '', order: order, 
    }
    this.databaseService.addItem(item)
  }

}
