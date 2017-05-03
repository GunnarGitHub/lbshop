import { FormGroup, FormBuilder } from '@angular/forms';
import { ListShopsComponent } from './../../items/list-shops/list-shops.component';
import { FirebaseListObservable } from 'angularfire2/database';
import { DatabaseService } from '../../common/services/database.service';
import { Component, OnInit, Input } from '@angular/core';

import { Shop, Department } from './../../common/model';

@Component({
  selector: 'list-departments',
  templateUrl: './list-departments.component.html',
  styleUrls: ['./list-departments.component.css']
})
export class ListDepartmentsComponent implements OnInit {

  @Input() shop: Shop
  @Input() id: string
  shopForm: FormGroup
  hidden: boolean = false
  departments: Department[]
  departments$: FirebaseListObservable<Department[]>

  constructor(private fb: FormBuilder,
    private databaseService: DatabaseService) {
    this.departments$ = this.departmentsByOwner$(this.shop)
    this.departments$.subscribe(temp => {
      temp.sort((temp1, temp2) => temp1.order - temp2.order);
      this.departments = temp
    })
  }

  public departmentsByOwner$(shop: Shop): FirebaseListObservable<Shop[]> {
    console.log("departmentsByOwner$ " + JSON.stringify(ListShopsComponent));
    return this.databaseService.departmentsByOwner$(shop)
  }

  ngOnInit() {
    console.log('ngOnInit ');
    this.shopForm = this.fb.group({
      $key: this.shop.$key,
      name: this.shop.name,
      owner: this.shop.owner,
      order: this.shop.order
    })

  }

  public addNewDepartment() {
    //TODO
    console.log('addNewDepartment TOSO')
  }

  onChange() {
    //console.log("onChange " + JSON.stringify(this.departmentForm.value));
    console.log('onChange TOSO')
    //this.databaseService.updateDepartment(this.shopForm.value);
  }


}
