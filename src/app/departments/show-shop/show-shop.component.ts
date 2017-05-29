import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject'
import { Component, OnInit, AfterViewInit, Input, Output } from '@angular/core';
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
  //GB @Input() shops: Shop[]
  //GB  @Input() departments: Department[]

  //GBfirstDepartmentEvent: Department
  departments: Department[]
  departments$: FirebaseListObservable<Department[]>;

  shopForm: FormGroup
  hidden: boolean
  searchSubscription: Subject<string>
  //GB firstDepartment: Department
  dnddepartmentKey = 'string:text/departmentkey'

  constructor(private fb: FormBuilder,
    private databaseService: DatabaseService,
    private searchService: SearchService) { }

  /* GB
  addFirstDepartment(department: Department) {
    console.log('addFirstDepartment ' + JSON.stringify(department));
    //GB this.firstdepartment = department
    //GB this.databaseService.addDepartment(this.departments[0])
  }
  */

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

  newDepartment() {
    console.log('newDepartment')
    let form = document.getElementById('d0-f')
    console.log('form 4 ' + (<HTMLInputElement>form.children[4]).value)
    let order = form ? ((+(<HTMLInputElement>form.children[4]).value) - 100) : 1000
    let owner = this.shopForm.value.$key
    let department: Department = {
      owner: owner, name: '', order: order
    }
    this.databaseService.addDepartment(department)
  }
}

