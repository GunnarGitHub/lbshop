import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject'
import { Component, OnInit, AfterViewInit, Input, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms'

import { FirebaseListObservable } from 'angularfire2';
import { SearchService, DatabaseService } from './../../common/services'
import { Shop, Department } from './../../common/model'

@Component({
  selector: 'list-shop',
  templateUrl: './list-shop.component.html',
  styleUrls: ['./list-shop.component.css']
})
export class ListShopComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() shop: Shop
  @Input() id: string

  departments$: FirebaseListObservable<Department[]>;


  private shopForm: FormGroup
  private hidden: boolean
  private searchSubscription: Subject<string>
  firstdepartment: Department
  dnddepartmentKey = 'string:text/departmentkey'

  constructor(private fb: FormBuilder,
    private databaseService: DatabaseService,
    private searchService: SearchService) { }

  addFirstDepartment(department: Department) {
    this.firstdepartment = department
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
      //console.log('ngOnInit hidden? ' + this.hidden)
    })
  }

  ngOnChanges() {
    console.log('ngOnChanges')
    this.departments$ = this.databaseService.getDepartmentsByOwnerOrdered$(this.shop)

  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit')
    this.departments$ = this.databaseService.getDepartmentsByOwnerOrdered$(this.shop)

  }


  onChange() {
    //console.log("onChange " + JSON.stringify(this.departmentForm.value));
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
