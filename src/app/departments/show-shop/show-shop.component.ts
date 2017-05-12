import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject'
import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms'

import { FirebaseListObservable } from 'angularfire2/database';
import { SearchService, DatabaseService } from './../../common/services'
import { Shop, Department } from './../../common/model'

@Component({
  selector: 'show-shop',
  templateUrl: './show-shop.component.html',
  styleUrls: ['./show-shop.component.css']
})
export class ShowShopComponent implements OnInit, AfterViewInit {
  //GBexport class ListShopComponent implements OnInit {

  @Input() id: string
  @Input() shop: Shop
  @Input() shops: Shop[]
  //GB  @Input() departments: Department[]
  @Output() firstDepartmentEvent: EventEmitter<Department> = new EventEmitter();

  departments: Department[]
  departments$: FirebaseListObservable<Department[]>;

  shopForm: FormGroup
  hidden: boolean
  searchSubscription: Subject<string>
  firstdepartment: Department
  dnddepartmentKey = 'string:text/departmentkey'

  constructor(private fb: FormBuilder,
    private databaseService: DatabaseService,
    private searchService: SearchService) { }

  addFirstDepartment() {
    console.log('addFirstDepartment ');
    this.firstdepartment = this.departments[0]
    this.databaseService.addDepartment(this.departments[0])
  }

  ngOnInit() {
    console.log('ngOnInit ');
    this.shopForm = this.fb.group({
      $key: this.shop.$key,
      name: this.shop.name,
      owner: this.shop.owner,
      order: this.shop.order
    })

    this.searchSubscription = this.searchService.getSearchSubject()
    this.searchSubscription.subscribe(search => {
      //console.log('search ' + search + ' ' + this.department.name)
      if (search.length > 0) {
        this.hidden = !this.shop.name.toLowerCase().includes(search.toLowerCase())
      } else {
        this.hidden = false
      }
    })
    this.departments$ = this.databaseService.departmentsByOwner$(this.shop)
    this.departments$.subscribe(temp => {
      temp.sort((temp1, temp2) => temp1.order - temp2.order);
      this.departments = temp
    })
    this.firstDepartmentEvent.emit(this.departments ? this.departments[0] : null)
    //GBthis.departments$ = this.databaseService.departmentsByOwner$(this.shop)
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit ' + JSON.stringify(this.shop))
    //this.shopForm = new FormGroup()
  }

  onChange(): void {
    console.log("onChanges " + JSON.stringify(this.shopForm.value));
    this.databaseService.updateShop(this.shopForm.value);
  }

  addNewDepartment() {
    console.log('addNewDepartment')
    let owner = this.shopForm.value.$key
    let department: Department = {
      owner: owner, name: '',
      order: this.firstdepartment ? (this.firstdepartment.order - 100) : 1000
    }
    this.databaseService.addDepartment(department)
  }
}

