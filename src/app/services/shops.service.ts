import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Store, Action } from "@ngrx/store";

import { Shop, AppState } from '../model';

@Injectable()
export class ShopsService {

  shops$: Observable<Shop[]>;

  constructor(private store: Store<AppState>) {
    console.log("ShopsService constructor");
    this.shops$ = this.store.select(s => s.shops);
  }

  loadShops(owner: string): void {
    console.log("ShopsService loadShops");

    let initialState = [
        { key: "maxi", owner: "gunnar", name: "Maxi", order: 1.0 },
        { key: "city gross", owner: "gunnar", name: "City Gross", order: 2.2 },
        { key: "apoteket", owner: "lena", name: "Apoteket", order: 2.2 },
        { key: "systemet", owner: "lena", name: "Systemet", order: 2.3 }
      ];
    
    console.log("ShopsService dispatch LOAD_SHOPS");
    this.store.dispatch({ type: 'LOAD_SHOPS', payload: initialState} );
  }

}
