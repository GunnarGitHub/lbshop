import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { ListShopsComponent } from './../../items/list-shops/list-shops.component';
import { FirebaseListObservable } from 'angularfire2/database';
import { DatabaseService } from '../../common/services/database.service';
import { Component, OnInit, Input, Output, AfterViewInit, EventEmitter } from '@angular/core';

import { Shop, Department } from './../../common/model';

@Component({
  selector: 'show-departments',
  templateUrl: './show-departments.component.html',
  styleUrls: ['./show-departments.component.css']
})
export class ShowDepartmentsComponent implements OnInit {

  @Input() shop: Shop
  @Input() id: string
  @Output() firstDepartmentEvent: EventEmitter<Department> = new EventEmitter();

  departmentForm: FormGroup
  hidden: boolean = false
  departments: Department[]
  departments$: FirebaseListObservable<Department[]>

  constructor(private fb: FormBuilder,
    private databaseService: DatabaseService) {
  }

  /*GB
    public ngAfterViewInit() {
      console.log("ngAfterViewInit shop " + JSON.stringify(this.shop));
    }
    */

  public departmentsByOwner$(shop: Shop): FirebaseListObservable<Shop[]> {
    console.log("departmentsByOwner$ " + JSON.stringify(shop));
    return this.databaseService.departmentsByOwner$(shop)
  }

  ngOnInit() {
    console.log('ngOnInit ' + JSON.stringify(this.shop));
    this.departments$ = this.departmentsByOwner$(this.shop)
    this.departments$.subscribe(temp => {
      temp.sort((temp1, temp2) => temp1.order - temp2.order);
      this.departments = temp
    })
    this.departmentForm = this.fb.group({
      departments: this.fb.array([])
    });

    this.departmentForm = this.fb.group({
      $key: this.shop.$key,
      name: this.shop.name,
      owner: this.shop.owner,
      order: this.shop.order
    })
    this.showDepartments()
    this.firstDepartmentEvent.emit(this.departments ? this.departments[0] : null)

  }

  showDepartments() {
    if (this.departments) {
      // console.log('showItems ' + JSON.stringify(this.items));
      this.departments.forEach(department => {
        const control = <FormArray>this.departmentForm.controls['departments'];
        control.push(this.showDepartment(department))
      });
    }
  }

  showDepartment(department: Department) {
    return this.fb.group({
      $key: department.$key,
      owner: department.owner,
      name: department.name,
      order: department.order
    });

  }
  public addNewDepartment() {
    //TODO
    console.log('addNewDepartment TODO')
  }

  onChange() {
    //console.log("onChange " + JSON.stringify(this.departmentForm.value));
    console.log('onChange TODO')
    //this.databaseService.updateDepartment(this.shopForm.value);
  }


}
