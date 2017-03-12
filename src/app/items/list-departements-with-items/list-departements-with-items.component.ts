import { DatabaseService } from './../../common/services/database.service';
import { Component, OnInit, Input } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';

import { Department } from '../../common/model';

@Component({
  selector: 'list-departements-with-items',
  templateUrl: './list-departements-with-items.component.html',
  styleUrls: ['./list-departements-with-items.component.css']
})
export class ListDepartementsWithItemsComponent implements OnInit {

@Input() departments: Department[] = [];

  constructor( private databaseService: DatabaseService) {
    console.log("ListDepartementsWithItemsComponent constructor ");
   }
  
  ngOnInit() {
  }

}
