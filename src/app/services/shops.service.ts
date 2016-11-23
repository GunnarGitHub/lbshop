import { FirebaseListObservable } from 'angularfire2';
import { Injectable } from '@angular/core';

import { DatabaseService } from './database.service';
import { Shop } from '../model';



@Injectable()
export class ShopsService {

  shops$: FirebaseListObservable<Shop[]>;

  constructor(private db: DatabaseService) {
    console.log("ShopsService constructor");
    this.shops$ = this.db.shops$;
  }

}
