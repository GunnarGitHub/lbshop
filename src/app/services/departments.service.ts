import { Injectable } from '@angular/core';
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";

import { Shop, Department, AppState } from '../model'

@Injectable()
export class DepartmentsService {
  departments$: Observable<Department[]>;

  constructor(private store: Store<AppState>) {
    console.log("DepartmentsService constructor");
    this.departments$ = this.store.select(s => s.departments);
  }


  getDepartments(owner: string) {
    console.log("DepartmentsService getDepartments");

  }

  loadDepartments(shop: Shop) { //TODO use ore remove shops
    console.log("DepartmentsService dispatch LOAD_DEPARTMENTS");
    let initialState = [
      { key: 'frukt', owner: 'maxi', name: 'Frukt', order: 1 },
      { key: 'mejeri', owner: 'maxi', name: 'Mejeri', order: 2 },
      { key: 'diverse', owner: 'city gross', name: 'Diverse', order: 3 },
      { key: 'övrigt', owner: 'city gross', name: 'Övrigt', order: 4 }
    ]
    this.store.dispatch({ type: 'LOAD_DEPARTMENTS', payload: initialState });
  }
}
