import { DatabaseService } from './../services/database.service';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs'
import { FirebaseListObservable } from 'angularfire2';

import { AppState, Department, Item } from '../model';

@Component({
  selector: 'list-departements-with-items',
  templateUrl: './list-departements-with-items.component.html',
  styleUrls: ['./list-departements-with-items.component.css']
})
export class ListDepartementsWithItemsComponent implements OnInit {

@Input() departments: Department[] = [];

items$: FirebaseListObservable<Item[]>;

  constructor( private databaseService: DatabaseService) {
    console.log("ListDepartementsWithItemsComponent constructor");
    this.items$ = this.databaseService.getItemsObservable();
   }
  
  ngOnInit() {
  }

}
