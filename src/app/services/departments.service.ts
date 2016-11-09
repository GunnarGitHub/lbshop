import { Injectable } from '@angular/core';
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";

import { Shop, Department, AppState } from '../model'

@Injectable()
export class DepartmentsService {
  departments$: Observable<Department[]>;
  departmentsLoaded: boolean;

  constructor(private store: Store<AppState>) {
    console.log("DepartmentsService constructor");
    this.departments$ = this.store.select(s => s.departments);
    this.departmentsLoaded = false;
  }


  getDepartments(owner: string) {
    console.log("DepartmentsService getDepartments");

  }

  loadDepartments() {
    console.log("DepartmentsService dispatch LOAD_DEPARTMENTS");
    let initialState = [
      { key: 'frukt', owner: 'maxi', name: 'Frukt', order: 1 },
      { key: 'mejeri', owner: 'maxi', name: 'Mejeri', order: 2 },
      { key: 'diverse', owner: 'city gross', name: 'Diverse', order: 3 },
      { key: 'övrigt', owner: 'maxi', name: 'Övrigt', order: 4 }
    ]
    if (!this.departmentsLoaded) {
      this.store.dispatch({ type: 'LOAD_DEPARTMENTS', payload: initialState });
      this.departmentsLoaded = true;
    }
  }
}
